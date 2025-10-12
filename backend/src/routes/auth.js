const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// JWT Secret - Ganti dengan secret yang lebih aman di production!
const JWT_SECRET = process.env.JWT_SECRET || "sijali-secret-key-2025";
const JWT_EXPIRES_IN = "7d"; // Token berlaku 7 hari

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

module.exports = router;
