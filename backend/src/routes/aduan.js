const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { PrismaClient, Prisma } = require("@prisma/client");
const nodemailer = require("nodemailer");
const cloudinary = require("../config/cloudinary");

// SendGrid as alternative email service
let sendGridAvailable = false;
let sendGridMail = null;
if (process.env.SENDGRID_API_KEY) {
  try {
    sendGridMail = require("@sendgrid/mail");
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
    sendGridAvailable = true;
    console.log("✅ SendGrid configured as alternative email service");
  } catch (error) {
    console.warn("⚠️  SendGrid not available:", error.message);
    sendGridAvailable = false;
    sendGridMail = null;
  }
} else {
  console.log("ℹ️  SendGrid API key not provided, using SMTP only");
}

const router = express.Router();
const prisma = new PrismaClient();

// Helper: Convert BigInt to String for JSON serialization
const serializeBigInt = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "bigint") return obj.toString();
  if (Array.isArray(obj)) return obj.map(serializeBigInt);
  if (typeof obj === "object") {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = serializeBigInt(value);
    }
    return result;
  }
  return obj;
};
// Email transporter with multiple configuration options
let transporter = null;
let transporterConfig = null;

if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  try {
    // Primary configuration - optimized for Railway with more aggressive settings
    const primaryConfig = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure:
        String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: false,
      logger: false,
      connectionTimeout: 300000, // 5 minutes - very aggressive for Railway
      greetingTimeout: 120000, // 2 minutes
      socketTimeout: 300000, // 5 minutes
      pool: false, // Disable pooling for Railway
      tls: {
        rejectUnauthorized: false,
        ciphers:
          "HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA",
        secureProtocol: "TLSv1_2_method",
        servername: process.env.SMTP_HOST,
      },
      requireTLS: false, // More permissive for Railway
      ignoreTLS: false,
      // Additional Railway-specific options
      name: "sijali-railway",
      localAddress: undefined,
    };

    // Alternative configuration for better Railway compatibility
    const alternativeConfig = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465), // Try port 465 (SSL)
      secure: true, // Force SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: false,
      logger: false,
      connectionTimeout: 300000, // 5 minutes
      greetingTimeout: 120000, // 2 minutes
      socketTimeout: 300000, // 5 minutes
      pool: false, // Disable pooling for alternative config
      tls: {
        rejectUnauthorized: false,
        ciphers:
          "HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA",
        secureProtocol: "TLSv1_2_method",
        servername: process.env.SMTP_HOST,
      },
      requireTLS: false, // More permissive
      ignoreTLS: false,
      name: "sijali-railway-alt",
      localAddress: undefined,
    };

    // Third configuration - try different approach
    const thirdConfig = {
      host: process.env.SMTP_HOST,
      port: 25, // Try port 25 (non-encrypted)
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: false,
      logger: false,
      connectionTimeout: 300000,
      greetingTimeout: 120000,
      socketTimeout: 300000,
      pool: false,
      tls: {
        rejectUnauthorized: false,
      },
      requireTLS: false,
      ignoreTLS: true, // Allow non-encrypted for Railway
      name: "sijali-railway-plain",
    };

    // Try configurations in order of preference
    const configs = [
      { config: primaryConfig, name: "Primary (Port 587)" },
      { config: alternativeConfig, name: "Alternative (Port 465)" },
      { config: thirdConfig, name: "Third (Port 25)" },
    ];

    let configSuccess = false;
    for (let i = 0; i < configs.length; i++) {
      try {
        console.log(`🔍 Trying ${configs[i].name} configuration...`);
        transporter = nodemailer.createTransport(configs[i].config);
        transporterConfig = configs[i].name.toLowerCase().split(" ")[0];
        console.log(
          `✅ Email transporter configured (${configs[i].name}):`,
          process.env.SMTP_USER
        );
        configSuccess = true;
        break;
      } catch (error) {
        console.warn(`⚠️  ${configs[i].name} config failed:`, error.message);
        if (i === configs.length - 1) {
          console.error("❌ All email configurations failed");
          transporter = null;
          configSuccess = false;
        }
      }
    }

    if (!configSuccess && !sendGridAvailable) {
      console.warn("⚠️  No email service available - emails will be skipped");
    }
  } catch (error) {
    console.error("❌ Error setting up email configurations:", error.message);
    transporter = null;
    sendGridAvailable = false;
  }
} else {
  console.warn("⚠️  SMTP not configured - emails will not be sent");
}

// Test email connection on startup
const testEmailConnection = async () => {
  if (!transporter) {
    console.warn("⚠️  No email transporter available for testing");
    return false;
  }

  try {
    console.log("🔍 Testing email connection...");
    await transporter.verify();
    console.log("✅ Email connection verified successfully");
    return true;
  } catch (error) {
    console.error("❌ Email connection test failed:", error.message);
    return false;
  }
};

// Test connection on startup (non-blocking)
if (transporter) {
  testEmailConnection().catch(console.error);
}

// SendGrid email function as fallback
const sendEmailViaSendGrid = async (to, subject, html) => {
  if (!sendGridAvailable || !sendGridMail) {
    throw new Error("SendGrid not available");
  }

  const msg = {
    to: to,
    from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
    subject: subject,
    html: html,
  };

  try {
    console.log("📧 Sending email via SendGrid to:", to);
    const response = await sendGridMail.send(msg);
    console.log("✅ Email sent via SendGrid:", response[0].statusCode);
    return {
      success: true,
      messageId:
        response[0].headers["x-message-id"] || "sendgrid-" + Date.now(),
    };
  } catch (error) {
    console.error("❌ SendGrid email failed:", error.message);
    console.error("SendGrid error details:", error.response?.body || error);
    throw error;
  }
};

const sendStatusEmail = async (
  { to, nomorRuas, status, description },
  retryCount = 0
) => {
  if (!to) {
    console.warn("⚠️  No recipient email provided");
    return;
  }

  // Skip jika SMTP dan SendGrid belum dikonfigurasi
  if (!transporter && !sendGridAvailable) {
    console.warn(
      "⚠️  Neither SMTP nor SendGrid configured, skipping email send"
    );
    return;
  }

  // Fetch road details from jalan_lingkungan_kubu_raya table
  let roadDetails = null;
  try {
    const roadRows = await prisma.$queryRaw(
      Prisma.sql`
        SELECT nama_jalan, kecamatan, desa 
        FROM jalan_lingkungan_kubu_raya 
        WHERE no_ruas = ${nomorRuas}
        LIMIT 1
      `
    );
    roadDetails = roadRows && roadRows[0] ? roadRows[0] : null;
  } catch (error) {
    console.warn("⚠️  Could not fetch road details:", error.message);
  }

  const subject = `SIJALI - Status Aduan Ruas ${nomorRuas}: ${status}`;

  const statusMap = {
    diajukan: {
      label: "Diajukan",
      color: "#2563eb",
      bg: "#dbeafe",
      icon: "📋",
    },
    ditinjau: {
      label: "Ditinjau",
      color: "#f59e0b",
      bg: "#fef3c7",
      icon: "🔍",
    },
    selesai: { label: "Selesai", color: "#10b981", bg: "#d1fae5", icon: "✅" },
    ditolak: { label: "Ditolak", color: "#ef4444", bg: "#fee2e2", icon: "❌" },
  };

  const statusInfo = statusMap[status] || statusMap.diajukan;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:20px 0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);padding:30px 40px;text-align:center">
                  <!-- Title and subtitle -->
                  <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:bold;letter-spacing:2px">SIJALI</h1>
                  <p style="margin:8px 0 0 0;color:#dbeafe;font-size:14px;font-weight:400">Sistem Informasi Jalan Lingkungan - Kab. Kubu Raya</p>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding:40px">
                  <h2 style="margin:0 0 20px 0;color:#111827;font-size:20px">Informasi Status Aduan</h2>
                  <p style="margin:0 0 24px 0;color:#4b5563;line-height:1.6">Halo,</p>
                  <p style="margin:0 0 24px 0;color:#4b5563;line-height:1.6">
                    Terima kasih telah melaporkan aduan jalan melalui sistem SIJALI. Berikut adalah informasi terkait laporan Anda:
                  </p>
                  
                  <!-- Info Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;margin-bottom:24px">
                    <tr>
                      <td style="padding:20px">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="color:#6b7280;font-size:13px;padding-bottom:8px">Nomor Ruas</td>
                          </tr>
                          <tr>
                            <td style="color:#111827;font-size:16px;font-weight:600;padding-bottom:16px">${nomorRuas}</td>
                          </tr>
                          ${
                            roadDetails
                              ? `
                          <tr>
                            <td style="color:#6b7280;font-size:13px;padding-bottom:8px">Nama Jalan</td>
                          </tr>
                          <tr>
                            <td style="color:#111827;font-size:16px;font-weight:600;padding-bottom:16px">${
                              roadDetails.nama_jalan || "Tidak tersedia"
                            }</td>
                          </tr>
                          <tr>
                            <td style="color:#6b7280;font-size:13px;padding-bottom:8px">Lokasi</td>
                          </tr>
                          <tr>
                            <td style="color:#111827;font-size:16px;font-weight:600;padding-bottom:16px">${
                              roadDetails.kecamatan || "Tidak tersedia"
                            }, ${roadDetails.desa || "Tidak tersedia"}</td>
                          </tr>
                          `
                              : ""
                          }
                          <tr>
                            <td style="color:#6b7280;font-size:13px;padding-bottom:8px">Status Laporan</td>
                          </tr>
                          <tr>
                            <td>
                              <div style="display:inline-block;background-color:${
                                statusInfo.bg
                              };color:${
    statusInfo.color
  };padding:8px 16px;border-radius:20px;font-size:14px;font-weight:600">
                                ${statusInfo.icon} ${statusInfo.label}
                              </div>
                            </td>
                          </tr>
                          ${
                            description
                              ? `
                          <tr>
                            <td style="color:#6b7280;font-size:13px;padding-top:16px;padding-bottom:8px">Keterangan</td>
                          </tr>
                          <tr>
                            <td style="color:#4b5563;font-size:14px;line-height:1.6">${description}</td>
                          </tr>
                          `
                              : ""
                          }
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin:0 0 16px 0;color:#4b5563;line-height:1.6">
                    Kami akan terus memberikan update terkait perkembangan laporan Anda.
                  </p>
                  <p style="margin:0;color:#4b5563;line-height:1.6">
                    Terima kasih atas partisipasi Anda dalam meningkatkan kualitas jalan di Kabupaten Kubu Raya.
                  </p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb">
                  <p style="margin:0 0 8px 0;color:#6b7280;font-size:12px;line-height:1.6">
                    Email ini dikirim secara otomatis oleh sistem SIJALI. Mohon tidak membalas email ini.
                  </p>
                  <p style="margin:0;color:#9ca3af;font-size:11px">
                    © 2025 SIJALI - Kabupaten Kubu Raya
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    console.log(
      `📧 Sending email to ${to} - Status: ${status} (Attempt ${
        retryCount + 1
      })`
    );

    // Try SMTP first if available
    if (transporter) {
      console.log(
        `📧 Using SMTP transporter config: ${transporterConfig || "unknown"}`
      );

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject,
        html,
      };

      console.log(`📧 SMTP Mail options:`, {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        htmlLength: mailOptions.html.length,
      });

      const info = await transporter.sendMail(mailOptions);
      console.log(
        `✅ Email sent successfully via SMTP! MessageId: ${info.messageId}`
      );
      return { success: true, messageId: info.messageId };
    }
    // Fallback to SendGrid if SMTP not available
    else if (sendGridAvailable) {
      console.log(`📧 Using SendGrid as fallback`);
      const result = await sendEmailViaSendGrid(to, subject, html);
      return result;
    } else {
      throw new Error("No email service available");
    }
  } catch (error) {
    console.error(
      `❌ Error sending email (Attempt ${retryCount + 1}):`,
      error.message
    );
    console.error("Error code:", error.code);
    console.error("Error command:", error.command);
    console.error("Full error:", error);

    // Retry logic for connection timeouts and temporary failures
    const maxRetries = 3;
    const retryableErrors = [
      "ETIMEDOUT",
      "ECONNRESET",
      "ENOTFOUND",
      "ECONNREFUSED",
      "EHOSTUNREACH",
      "ECONNABORTED",
    ];

    if (retryCount < maxRetries && retryableErrors.includes(error.code)) {
      console.log(
        `🔄 Retrying email send in 5 seconds... (${
          retryCount + 1
        }/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return sendStatusEmail(
        { to, nomorRuas, status, description },
        retryCount + 1
      );
    }

    // If SMTP failed and SendGrid is available, try SendGrid as last resort
    if (transporter && sendGridAvailable && retryCount === 0) {
      console.log("🔄 SMTP failed, trying SendGrid as fallback...");
      try {
        const result = await sendEmailViaSendGrid(to, subject, html);
        return result;
      } catch (sendGridError) {
        console.error(
          "❌ SendGrid fallback also failed:",
          sendGridError.message
        );
      }
    }

    // Log final failure with more details
    console.error(`❌ Email send failed after ${retryCount + 1} attempts:`, {
      error: error.message,
      code: error.code,
      command: error.command,
      attempts: retryCount + 1,
      config: transporterConfig,
    });

    // Tidak throw error, hanya log saja agar proses tidak terganggu
    return { success: false, error: error.message, attempts: retryCount + 1 };
  }
};

// Setup Cloudinary storage
let storage, upload;

try {
  console.log("Setting up Cloudinary storage...");
  console.log("Cloudinary config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? "***" : "NOT SET",
    api_secret: process.env.CLOUDINARY_API_SECRET ? "***" : "NOT SET",
    folder: process.env.CLOUDINARY_FOLDER || "SIJALI",
  });

  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const nomorRuas = req.body.nomor_ruas || "unknown";
      return {
        folder: `${
          process.env.CLOUDINARY_FOLDER || "SIJALI"
        }/aduan/${nomorRuas}`,
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: [{ width: 1200, height: 1200, crop: "limit" }],
      };
    },
  });

  upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024, files: 10 }, // 10MB limit per file, max 10 files
  });

  console.log("✅ Cloudinary storage configured successfully");
} catch (error) {
  console.error("❌ Error setting up Cloudinary storage:", error);
  // Fallback to memory storage if Cloudinary fails
  const multer = require("multer");
  upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024, files: 10 },
  });
  console.log("⚠️  Using memory storage as fallback");
}

// GET /api/aduan - list semua aduan dengan pagination dan filter
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status || null;

    const [rows, total] = await Promise.all([
      prisma.$queryRaw`
        SELECT * FROM aduan
        ${status ? Prisma.sql`WHERE status = ${status}` : Prisma.empty}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      prisma.$queryRaw`
        SELECT COUNT(*)::int as total FROM aduan
        ${status ? Prisma.sql`WHERE status = ${status}` : Prisma.empty}
      `,
    ]);

    const totalCount = total && total[0] ? total[0].total : 0;

    // Use JSON.stringify with replacer to handle BigInt serialization
    const serializedData = JSON.parse(
      JSON.stringify(rows || [], (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return res.json({
      success: true,
      data: serializedData,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (err) {
    console.error("GET /api/aduan error:", err);
    return res
      .status(500)
      .json({ success: false, error: err.message || "Terjadi kesalahan" });
  }
});

// POST /api/aduan - terima form multipart dan simpan ke DB + upload ke Cloudinary
router.post("/", upload.array("photos", 10), async (req, res) => {
  try {
    console.log("POST /api/aduan - Request received");
    console.log("Body:", req.body);
    console.log("Files:", req.files ? req.files.length : 0);

    const nomorRuas = (req.body.nomor_ruas || "").trim();
    const namaPelapor = (req.body.nama_pelapor || "").trim() || null;
    const anonim = String(req.body.anonim).toLowerCase() === "true";
    const description = (req.body.description || "").trim() || null;
    const email = (req.body.email || "").trim() || null;

    if (!nomorRuas) {
      console.log("Error: nomor_ruas is required");
      return res
        .status(400)
        .json({ success: false, error: "nomor_ruas wajib diisi" });
    }

    // Get uploaded photos URLs from Cloudinary
    const photos = req.files ? req.files.map((file) => file.path) : [];
    console.log("Photos URLs:", photos);

    console.log("About to insert into database...");
    console.log("Insert data:", {
      nomorRuas,
      namaPelapor: anonim ? null : namaPelapor,
      anonim,
      description,
      email,
      photos: photos.length,
      photosArray: photos,
    });

    // Insert menggunakan Prisma ORM biasa (lebih aman untuk array)
    const created = await prisma.aduan.create({
      data: {
        nomorRuas,
        namaPelapor: anonim ? null : namaPelapor,
        anonim,
        description,
        email,
        photos: photos, // Prisma akan handle array dengan benar
        status: "diajukan",
      },
    });

    console.log("Database insert result:", created);

    // Kirim email status "diajukan" ke pelapor bila ada email (async, tidak memblokir response)
    if (email) {
      setImmediate(async () => {
        try {
          await sendStatusEmail({
            to: email,
            nomorRuas: nomorRuas,
            status: "diajukan",
            description,
          });
        } catch (emailError) {
          console.error("Error sending status email:", emailError);
          // Continue even if email fails
        }
      });
    }

    return res.json({ success: true, data: serializeBigInt(created) });
  } catch (err) {
    console.error("POST /api/aduan error:", err);
    console.error("Error stack:", err.stack);
    console.error("Error details:", {
      message: err.message,
      code: err.code,
      name: err.name,
    });
    return res.status(500).json({
      success: false,
      error: err.message || "Terjadi kesalahan",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

// PATCH /api/aduan/:id/status - ubah status dan kirim email notifikasi
router.patch("/:id/status", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status, description } = req.body || {};

    const allowed = ["diajukan", "ditinjau", "selesai", "ditolak"];
    if (!allowed.includes(status)) {
      return res
        .status(400)
        .json({ success: false, error: "Status tidak valid" });
    }

    const rows = await prisma.$queryRaw(
      Prisma.sql`
        UPDATE aduan SET status = ${status}, updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `
    );

    const updated = rows && rows[0] ? rows[0] : null;
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, error: "Aduan tidak ditemukan" });
    }

    // Kirim email notifikasi (async, tidak memblokir response)
    if (updated.email) {
      setImmediate(async () => {
        try {
          await sendStatusEmail({
            to: updated.email,
            nomorRuas: updated.nomor_ruas,
            status,
            description: description || updated.description,
          });
        } catch (emailError) {
          console.error("Error sending status email:", emailError);
          // Continue even if email fails
        }
      });
    }

    return res.json({ success: true, data: serializeBigInt(updated) });
  } catch (err) {
    console.error("PATCH /api/aduan/:id/status error:", err);
    return res
      .status(500)
      .json({ success: false, error: err.message || "Terjadi kesalahan" });
  }
});

module.exports = router;
