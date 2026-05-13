const fs = require('fs');
const path = require('path');

const runMigrations = async (pool) => {
  const migrationsDir = __dirname;
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  for (const file of migrationFiles) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    
    try {
      console.log(`Running migration: ${file}`);
      await pool.query(sql);
      console.log(`✓ Migration ${file} completed`);
    } catch (err) {
      console.error(`✗ Migration ${file} failed:`, err.message);
      throw err;
    }
  }
};

module.exports = { runMigrations };
