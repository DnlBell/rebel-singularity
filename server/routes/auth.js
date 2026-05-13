const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

const generateToken = (userId, email, username) => {
  return jwt.sign(
    { id: userId, email, username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// POST /auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const pool = req.app.locals.pool;

    // Validation
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const userExists = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: 'Email or username already taken' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, username, password_hash, display_name) VALUES ($1, $2, $3, $4) RETURNING id, email, username, display_name',
      [email, username, passwordHash, username]
    );

    const user = result.rows[0];
    const token = generateToken(user.id, user.email, user.username);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.display_name
      }
    });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const pool = req.app.locals.pool;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const result = await pool.query(
      'SELECT id, email, username, password_hash, display_name FROM users WHERE email = $1 AND password_hash IS NOT NULL',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id, user.email, user.username);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.display_name
      }
    });
  } catch (err) {
    next(err);
  }
});

// POST /auth/google (expects Google ID token from frontend)
router.post('/google', async (req, res, next) => {
  try {
    const { googleId, email, displayName } = req.body;
    const pool = req.app.locals.pool;

    if (!googleId || !email) {
      return res.status(400).json({ error: 'Google ID and email are required' });
    }

    // Check if user exists with this OAuth provider
    let result = await pool.query(
      'SELECT id, email, username, display_name FROM users WHERE oauth_provider = $1 AND oauth_id = $2',
      ['google', googleId]
    );

    let user = result.rows[0];

    if (!user) {
      // Create new user with OAuth
      result = await pool.query(
        'INSERT INTO users (email, username, display_name, oauth_provider, oauth_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, username, display_name',
        [email, email.split('@')[0], displayName || email.split('@')[0], 'google', googleId]
      );
      user = result.rows[0];
    }

    const token = generateToken(user.id, user.email, user.username);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.display_name
      }
    });
  } catch (err) {
    next(err);
  }
});

// POST /auth/github (expects GitHub OAuth token from frontend)
router.post('/github', async (req, res, next) => {
  try {
    const { githubId, email, displayName, login } = req.body;
    const pool = req.app.locals.pool;

    if (!githubId) {
      return res.status(400).json({ error: 'GitHub ID is required' });
    }

    // Check if user exists with this OAuth provider
    let result = await pool.query(
      'SELECT id, email, username, display_name FROM users WHERE oauth_provider = $1 AND oauth_id = $2',
      ['github', githubId]
    );

    let user = result.rows[0];

    if (!user) {
      // Create new user with OAuth
      result = await pool.query(
        'INSERT INTO users (email, username, display_name, oauth_provider, oauth_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, username, display_name',
        [email, login, displayName || login, 'github', githubId]
      );
      user = result.rows[0];
    }

    const token = generateToken(user.id, user.email, user.username);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.display_name
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /auth/me (protected)
router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const pool = req.app.locals.pool;

    const result = await pool.query(
      'SELECT id, email, username, display_name FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.display_name
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
