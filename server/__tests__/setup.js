const { Pool } = require('pg');
require('dotenv').config();

let pool;

// Initialize pool for tests
const getPool = async () => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
};

// Run migrations
const runMigrations = async (testPool) => {
  const fs = require('fs');
  const path = require('path');

  const migrationPath = path.join(__dirname, '../migrations/001_init.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  try {
    await testPool.query(sql);
    console.log('Migrations completed');
  } catch (err) {
    console.error('Migration error:', err);
    throw err;
  }
};

// Clean all tables (for tests)
const cleanDatabase = async (testPool) => {
  try {
    await testPool.query('TRUNCATE TABLE player_saves CASCADE');
    await testPool.query('TRUNCATE TABLE users CASCADE');
  } catch (err) {
    // Tables might not exist yet, ignore
  }
};

// Setup before all tests
beforeAll(async () => {
  const testPool = await getPool();
  await runMigrations(testPool);
  await cleanDatabase(testPool);
});

// Clean after each test
afterEach(async () => {
  const testPool = await getPool();
  await cleanDatabase(testPool);
});

// Close connection after all tests
afterAll(async () => {
  if (pool) {
    await pool.end();
    pool = null;
  }
});

module.exports = { getPool, runMigrations, cleanDatabase };
