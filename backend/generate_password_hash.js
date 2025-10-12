// ============================================
// Script untuk Generate Bcrypt Hash
// ============================================
// Jalankan: node generate_password_hash.js

const bcrypt = require('bcrypt');

const passwords = {
  admin: 'akuadmin',
  user: 'sijali2025'
};

const saltRounds = 10;

async function generateHashes() {
  console.log('Generating bcrypt hashes...\n');
  
  try {
    // Generate hash untuk admin password
    const adminHash = await bcrypt.hash(passwords.admin, saltRounds);
    console.log('=== ADMIN ===');
    console.log('Plain Password:', passwords.admin);
    console.log('Bcrypt Hash:', adminHash);
    console.log();
    
    // Generate hash untuk user password
    const userHash = await bcrypt.hash(passwords.user, saltRounds);
    console.log('=== USER ===');
    console.log('Plain Password:', passwords.user);
    console.log('Bcrypt Hash:', userHash);
    console.log();
    
    // Generate SQL INSERT statement
    console.log('=== SQL INSERT STATEMENTS ===\n');
    console.log(`INSERT INTO "User" ("email", "username", "password", "role") VALUES`);
    console.log(`  ('irfansabrian34@gmail.com', 'irfansabrian', '${adminHash}', 'ADMIN'),`);
    console.log(`  (NULL, 'kpnusantara', '${userHash}', 'USER');`);
    console.log();
    
    // Test verification
    console.log('=== VERIFICATION TEST ===');
    const adminVerify = await bcrypt.compare(passwords.admin, adminHash);
    const userVerify = await bcrypt.compare(passwords.user, userHash);
    console.log('Admin password verification:', adminVerify ? '✅ Valid' : '❌ Invalid');
    console.log('User password verification:', userVerify ? '✅ Valid' : '❌ Invalid');
    
  } catch (error) {
    console.error('Error generating hashes:', error);
  }
}

generateHashes();

