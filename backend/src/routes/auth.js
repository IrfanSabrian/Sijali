const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// JWT Secret - Ganti dengan secret yang lebih aman di production!
const JWT_SECRET = process.env.JWT_SECRET || "sijali-secret-key-2025";
const JWT_EXPIRES_IN = "7d"; // Token berlaku 7 hari

// Middleware untuk autentikasi
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token tidak valid atau sudah kadaluarsa",
      });
    }
    req.user = user;
    next();
  });
};

// Middleware untuk cek role admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Akses ditolak. Hanya admin yang dapat mengakses resource ini.",
    });
  }
  next();
};

/**
 * POST /api/auth/login
 * Login endpoint
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password harus diisi",
      });
    }

    // Cari user berdasarkan username
    const user = await prisma.user.findUnique({
      where: { username: username.trim() },
    });

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Response sukses (tanpa mengirim password)
    res.json({
      success: true,
      message: "Login berhasil",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token: token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat login",
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/verify
 * Verify JWT token
 */
router.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Optional: Cek apakah user masih ada di database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Token valid",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Token tidak valid",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token sudah kadaluarsa",
      });
    }

    console.error("Error during token verification:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat verifikasi token",
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout endpoint (client-side akan hapus token)
 */
router.post("/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logout berhasil",
  });
});

/**
 * GET /api/auth/users
 * Get all users (Admin only)
 */
router.get("/users", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Jangan kirim password
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      message: "Data users berhasil diambil",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data users",
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/register
 * Register new user (Admin only)
 */
router.post("/register", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password harus diisi",
      });
    }

    // Cek apakah username sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { username: username.trim() },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username sudah digunakan",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        username: username.trim(),
        email: email ? email.trim() : null,
        password: hashedPassword,
        role: role || "USER",
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "User berhasil dibuat",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Gagal membuat user",
      error: error.message,
    });
  }
});

/**
 * PUT /api/auth/users/:id
 * Update user (Admin only)
 */
router.put("/users/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    // Cek apakah user ada
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // Prepare data untuk update
    const updateData = {};

    if (username) {
      // Cek apakah username baru sudah digunakan user lain
      const usernameExists = await prisma.user.findFirst({
        where: {
          username: username.trim(),
          NOT: { id: parseInt(id) },
        },
      });

      if (usernameExists) {
        return res.status(400).json({
          success: false,
          message: "Username sudah digunakan",
        });
      }

      updateData.username = username.trim();
    }

    if (email !== undefined) {
      updateData.email = email ? email.trim() : null;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (role) {
      updateData.role = role;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      message: "User berhasil diupdate",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengupdate user",
      error: error.message,
    });
  }
});

/**
 * DELETE /api/auth/users/:id
 * Delete user (Admin only)
 */
router.delete(
  "/users/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Cek apakah user ada
      const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
        });
      }

      // Prevent deleting own account
      if (req.user.userId === parseInt(id)) {
        return res.status(400).json({
          success: false,
          message: "Tidak dapat menghapus akun sendiri",
        });
      }

      // Delete user
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      res.json({
        success: true,
        message: "User berhasil dihapus",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus user",
        error: error.message,
      });
    }
  }
);

module.exports = router;
