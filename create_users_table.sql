-- ============================================
-- SQL Script untuk Tabel Users di PostgreSQL
-- ============================================
-- Drop table jika sudah ada (hati-hati di production!)
DROP TABLE IF EXISTS "User" CASCADE;

-- Buat ENUM untuk role
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- Buat tabel User
CREATE TABLE
    "User" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(255) UNIQUE,
        "username" VARCHAR(100) NOT NULL UNIQUE,
        "password" VARCHAR(255) NOT NULL,
        "role" "Role" NOT NULL DEFAULT 'USER',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- Buat index untuk performa
CREATE INDEX "User_email_idx" ON "User" ("email");

CREATE INDEX "User_username_idx" ON "User" ("username");

CREATE INDEX "User_role_idx" ON "User" ("role");

-- Insert data user
-- Admin password: "akuadmin"
-- User password: "sijali2025"
INSERT INTO
    "User" ("email", "username", "password", "role")
VALUES
    (
        'irfansabrian34@gmail.com',
        'irfansabrian',
        '$2b$10$x4AcQU2GBHAzLJZU6D/FKObigT8McEDyKrJnvBaEAiU5d5K3R8g0y',
        'ADMIN'
    ),
    (
        NULL,
        'kpnusantara',
        '$2b$10$Qgm4IHfWsm/SwmREnMRAD.9c3Ii1HDbG/Fq8NT69VzLgG.g748nE6',
        'USER'
    );

-- ============================================
-- Verifikasi
-- ============================================
SELECT
    *
FROM
    "User";