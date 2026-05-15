const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getPool } = require('./setup');

/**
 * Create a test user in the database
 */
const createTestUser = async (userData = {}) => {
  const pool = await getPool();
  const {
    email = 'test@example.com',
    username = 'testuser',
    password = 'testpassword123',
    displayName = 'Test User'
  } = userData;

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'INSERT INTO users (email, username, password_hash, display_name) VALUES ($1, $2, $3, $4) RETURNING id, email, username, display_name',
    [email, username, passwordHash, displayName]
  );

  return result.rows[0];
};

/**
 * Create a test user with OAuth
 */
const createTestOAuthUser = async (userData = {}) => {
  const pool = await getPool();
  const {
    email = 'oauth@example.com',
    username = 'oauthuser',
    displayName = 'OAuth User',
    oauthProvider = 'google',
    oauthId = 'google-123456'
  } = userData;

  const result = await pool.query(
    'INSERT INTO users (email, username, display_name, oauth_provider, oauth_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, username, display_name',
    [email, username, displayName, oauthProvider, oauthId]
  );

  return result.rows[0];
};

/**
 * Create a test save for a user
 */
const createTestSave = async (userId, saveData = {}) => {
  const pool = await getPool();
  const {
    playerJson = { className: 'Warrior', level: 1, hp: 100 },
    dungeonJson = { currentRoom: 0, rooms: [] },
    logJson = [],
    turnCount = 0
  } = saveData;

  const result = await pool.query(
    `INSERT INTO player_saves (user_id, player_json, dungeon_json, log_json, turn_count)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, user_id, turn_count, created_at, last_modified`,
    [userId, playerJson, dungeonJson, logJson, turnCount]
  );

  return result.rows[0];
};

/**
 * Generate a valid JWT token
 */
const generateToken = (userId, email, username) => {
  return jwt.sign(
    { id: userId, email, username },
    process.env.JWT_SECRET || 'test-secret-key',
    { expiresIn: '7d' }
  );
};

/**
 * Generate an expired JWT token
 */
const generateExpiredToken = (userId, email, username) => {
  return jwt.sign(
    { id: userId, email, username },
    process.env.JWT_SECRET || 'test-secret-key',
    { expiresIn: '-1h' }
  );
};

module.exports = {
  createTestUser,
  createTestOAuthUser,
  createTestSave,
  generateToken,
  generateExpiredToken
};
