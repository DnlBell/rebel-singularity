const request = require('supertest');
const express = require('express');
const authRoutes = require('../../routes/auth');

// Mock the bcrypt and jwt modules
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Auth Routes', () => {
  let app;
  let mockPool;

  beforeEach(() => {
    // Create fresh app and mock pool for each test
    app = express();
    app.use(express.json());

    mockPool = {
      query: jest.fn()
    };

    app.locals.pool = mockPool;
    app.use('/auth', authRoutes);

    // Error handler
    app.use((err, req, res, next) => {
      res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
      });
    });

    // Reset all mocks
    jest.clearAllMocks();

    // Mock bcrypt
    bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword123');
    bcrypt.compare = jest.fn();

    // Mock JWT
    jwt.sign = jest.fn().mockReturnValue('mocked-jwt-token');
    jwt.verify = jest.fn();
  });

  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // Check if user exists
        .mockResolvedValueOnce({
          rows: [
            {
              id: 1,
              email: 'newuser@example.com',
              username: 'newuser',
              display_name: 'newuser'
            }
          ]
        }); // Insert user

      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          username: 'newuser',
          password: 'password123'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.token).toBe('mocked-jwt-token');
      expect(res.body.user.email).toBe('newuser@example.com');
      expect(res.body.user.username).toBe('newuser');
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    });

    it('should reject registration with missing email', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'newuser',
          password: 'password123'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('required');
    });

    it('should reject registration with missing username', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('required');
    });

    it('should reject registration with missing password', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          username: 'newuser'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('required');
    });

    it('should reject registration with password less than 6 characters', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          username: 'newuser',
          password: '12345'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('at least 6 characters');
    });

    it('should reject registration with duplicate email', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [{ id: 999 }] // User exists
      });

      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'duplicate@example.com',
          username: 'newuser',
          password: 'password123'
        });

      expect(res.status).toBe(409);
      expect(res.body.error).toContain('taken');
    });

    it('should reject registration with duplicate username', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [{ id: 999 }] // User exists
      });

      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          username: 'duplicate',
          password: 'password123'
        });

      expect(res.status).toBe(409);
      expect(res.body.error).toContain('taken');
    });

    it('should generate valid JWT token on registration', async () => {
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // Check if user exists
        .mockResolvedValueOnce({
          rows: [
            {
              id: 1,
              email: 'test@example.com',
              username: 'testuser',
              display_name: 'testuser'
            }
          ]
        }); // Insert user

      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          username: 'testuser',
          password: 'password123'
        });

      expect(res.status).toBe(201);
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          username: 'testuser'
        }),
        expect.any(String),
        { expiresIn: '7d' }
      );
    });
  });

  describe('POST /auth/login', () => {
    it('should login with correct credentials', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            email: 'login@example.com',
            username: 'loginuser',
            password_hash: 'hashedPassword123',
            display_name: 'Login User'
          }
        ]
      });

      bcrypt.compare.mockResolvedValueOnce(true);

      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('login@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
    });

    it('should reject login with missing email', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          password: 'password123'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('required');
    });

    it('should reject login with missing password', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'login@example.com'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('required');
    });

    it('should reject login with nonexistent email', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [] // User not found
      });

      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(401);
      expect(res.body.error).toContain('Invalid');
    });

    it('should reject login with wrong password', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            email: 'login@example.com',
            username: 'loginuser',
            password_hash: 'hashedPassword123',
            display_name: 'Login User'
          }
        ]
      });

      bcrypt.compare.mockResolvedValueOnce(false);

      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        });

      expect(res.status).toBe(401);
      expect(res.body.error).toContain('Invalid');
    });

    it('should generate valid JWT token on login', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            email: 'login@example.com',
            username: 'loginuser',
            password_hash: 'hashedPassword123',
            display_name: 'Login User'
          }
        ]
      });

      bcrypt.compare.mockResolvedValueOnce(true);

      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(jwt.sign).toHaveBeenCalled();
    });
  });

  describe('POST /auth/google', () => {
    it('should create new user on first Google login', async () => {
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // Check if user exists
        .mockResolvedValueOnce({
          rows: [
            {
              id: 2,
              email: 'googleuser@gmail.com',
              username: 'googleuser',
              display_name: 'Google User'
            }
          ]
        }); // Insert new user

      const res = await request(app)
        .post('/auth/google')
        .send({
          googleId: 'google-12345',
          email: 'googleuser@gmail.com',
          displayName: 'Google User'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('googleuser@gmail.com');
    });

    it('should login existing Google user', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [
          {
            id: 2,
            email: 'googleuser@gmail.com',
            username: 'googleuser',
            display_name: 'Google User'
          }
        ]
      }); // User exists

      const res = await request(app)
        .post('/auth/google')
        .send({
          googleId: 'google-12345',
          email: 'googleuser@gmail.com',
          displayName: 'Google User'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('googleuser@gmail.com');
    });

    it('should reject Google auth without googleId', async () => {
      const res = await request(app)
        .post('/auth/google')
        .send({
          email: 'googleuser@gmail.com',
          displayName: 'Google User'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Google ID');
    });

    it('should reject Google auth without email', async () => {
      const res = await request(app)
        .post('/auth/google')
        .send({
          googleId: 'google-12345',
          displayName: 'Google User'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('required');
    });

    it('should use email prefix as username if not provided', async () => {
      mockPool.query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 3,
              email: 'testuser@gmail.com',
              username: 'testuser',
              display_name: 'testuser'
            }
          ]
        });

      const res = await request(app)
        .post('/auth/google')
        .send({
          googleId: 'google-12345',
          email: 'testuser@gmail.com'
        });

      expect(res.status).toBe(200);
      expect(res.body.user.username).toBe('testuser');
    });
  });

  describe('POST /auth/github', () => {
    it('should create new user on first GitHub login', async () => {
      mockPool.query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 4,
              email: 'githubuser@github.com',
              username: 'githubuser',
              display_name: 'GitHub User'
            }
          ]
        });

      const res = await request(app)
        .post('/auth/github')
        .send({
          githubId: 'github-12345',
          email: 'githubuser@github.com',
          displayName: 'GitHub User',
          login: 'githubuser'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('githubuser@github.com');
      expect(res.body.user.username).toBe('githubuser');
    });

    it('should login existing GitHub user', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [
          {
            id: 4,
            email: 'githubuser@github.com',
            username: 'githubuser',
            display_name: 'GitHub User'
          }
        ]
      });

      const res = await request(app)
        .post('/auth/github')
        .send({
          githubId: 'github-12345',
          email: 'githubuser@github.com',
          login: 'githubuser'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should reject GitHub auth without githubId', async () => {
      const res = await request(app)
        .post('/auth/github')
        .send({
          email: 'githubuser@github.com',
          login: 'githubuser'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('GitHub ID');
    });
  });

  describe('GET /auth/me', () => {
    it('should return current user with valid token', async () => {
      // Mock successful JWT verification
      jwt.verify.mockImplementationOnce((token, secret, callback) => {
        callback(null, { id: 1, email: 'me@example.com', username: 'meuser' });
      });

      mockPool.query.mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            email: 'me@example.com',
            username: 'meuser',
            display_name: 'Me User'
          }
        ]
      });

      const res = await request(app)
        .get('/auth/me')
        .set('Authorization', 'Bearer valid-token');

      expect(res.status).toBe(200);
      expect(res.body.user.id).toBe(1);
      expect(res.body.user.email).toBe('me@example.com');
      expect(res.body.user.username).toBe('meuser');
    });

    it('should reject request without token', async () => {
      const res = await request(app)
        .get('/auth/me');

      expect(res.status).toBe(401);
      expect(res.body.error).toContain('No token');
    });

    it('should reject request with invalid token', async () => {
      jwt.verify.mockImplementationOnce((token, secret, callback) => {
        callback(new Error('Invalid signature'));
      });

      const res = await request(app)
        .get('/auth/me')
        .set('Authorization', 'Bearer invalid-token');

      expect(res.status).toBe(403);
      expect(res.body.error).toContain('Invalid');
    });

    it('should reject request with expired token', async () => {
      jwt.verify.mockImplementationOnce((token, secret, callback) => {
        const err = new Error('jwt expired');
        callback(err);
      });

      const res = await request(app)
        .get('/auth/me')
        .set('Authorization', 'Bearer expired-token');

      expect(res.status).toBe(403);
      expect(res.body.error).toContain('Invalid');
    });
  });
});
