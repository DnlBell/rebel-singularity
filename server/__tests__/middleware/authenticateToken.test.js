const authenticateToken = require('../../middleware/authenticateToken');
jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

describe('authenticateToken Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('Token Validation', () => {
    it('should call next() with valid token', () => {
      const mockUser = { id: 1, email: 'test@example.com', username: 'testuser' };

      req.headers.authorization = 'Bearer valid-jwt-token';

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      authenticateToken(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith('valid-jwt-token', process.env.JWT_SECRET, expect.any(Function));
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 401 status when no token is provided', () => {
      req.headers.authorization = undefined;

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: expect.stringContaining('No token')
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle Authorization header without Bearer prefix', () => {
      req.headers.authorization = 'my-token-without-bearer';

      // The middleware looks for 'Bearer ' prefix, and if not found, token is undefined
      // So it should return 401
      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: expect.stringContaining('No token')
      });
    });

    it('should return 403 status when token is invalid', () => {
      req.headers.authorization = 'Bearer expired-or-invalid-token';

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error('jwt invalid'));
      });

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: expect.stringContaining('Invalid')
      });
      expect(next).not.toHaveBeenCalled();
      expect(req.user).toBeUndefined();
    });

    it('should return 403 status when token is expired', () => {
      req.headers.authorization = 'Bearer expired-token';

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error('jwt expired'));
      });

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: expect.stringContaining('Invalid')
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 status when signature is invalid', () => {
      req.headers.authorization = 'Bearer tampered-token';

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error('invalid signature'));
      });

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: expect.stringContaining('Invalid')
      });
    });

    it('should extract user data from token payload', () => {
      const mockUser = {
        id: 42,
        email: 'user@example.com',
        username: 'customuser'
      };

      req.headers.authorization = 'Bearer some-token';

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      authenticateToken(req, res, next);

      expect(req.user).toBe(mockUser);
      expect(req.user.id).toBe(42);
      expect(req.user.email).toBe('user@example.com');
    });

    it('should attach user object to request', () => {
      const mockUser = { id: 1, email: 'test@example.com', username: 'testuser' };

      req.headers.authorization = 'Bearer valid-token';

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      authenticateToken(req, res, next);

      expect(req).toHaveProperty('user');
      expect(req.user).toEqual(mockUser);
    });
  });

  describe('Authorization Header Parsing', () => {
    it('should extract token from Bearer scheme', () => {
      req.headers.authorization = 'Bearer my-secret-token-123';

      jwt.verify.mockImplementation((token, secret, callback) => {
        // Verify we got the token without 'Bearer '
        expect(token).toBe('my-secret-token-123');
        callback(null, { id: 1 });
      });

      authenticateToken(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith('my-secret-token-123', process.env.JWT_SECRET, expect.any(Function));
    });

    it('should return 401 when Authorization header is empty string', () => {
      req.headers.authorization = '';

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return 401 when Authorization header is null', () => {
      req.headers.authorization = null;

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return 401 when Authorization header has only Bearer', () => {
      req.headers.authorization = 'Bearer';

      authenticateToken(req, res, next);

      // Token extracted will be undefined after 'Bearer '
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return 401 when Authorization header is just whitespace', () => {
      req.headers.authorization = '   ';

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });
  });

  describe('Integration with Express', () => {
    it('should work as Express middleware', () => {
      // Verify it has the correct signature: (req, res, next)
      expect(authenticateToken.length).toBe(3);
    });

    it('should maintain proper error handling', () => {
      req.headers.authorization = 'Bearer invalid';

      const errorMessage = 'Unexpected verification error';
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error(errorMessage));
      });

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: expect.stringContaining('Invalid')
      });
    });

    it('should not call next if authentication fails', () => {
      req.headers.authorization = undefined;

      authenticateToken(req, res, next);

      expect(next).not.toHaveBeenCalled();
    });

    it('should call next exactly once when authentication succeeds', () => {
      req.headers.authorization = 'Bearer valid-token';

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { id: 1 });
      });

      authenticateToken(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('Token Payload', () => {
    it('should handle tokens with complex payloads', () => {
      const complexPayload = {
        id: 123,
        email: 'user@example.com',
        username: 'complexuser',
        roles: ['admin', 'moderator'],
        permissions: {
          read: true,
          write: true,
          delete: false
        },
        metadata: {
          lastLogin: '2024-01-01T10:00:00Z',
          loginCount: 42
        }
      };

      req.headers.authorization = 'Bearer complex-token';

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, complexPayload);
      });

      authenticateToken(req, res, next);

      expect(req.user).toEqual(complexPayload);
      expect(req.user.roles).toContain('admin');
      expect(next).toHaveBeenCalled();
    });

    it('should preserve all properties from token payload', () => {
      const payload = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        iat: 1234567890,
        exp: 1234571490
      };

      req.headers.authorization = 'Bearer token-with-timestamps';

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, payload);
      });

      authenticateToken(req, res, next);

      expect(req.user).toEqual(payload);
      expect(req.user.iat).toBe(1234567890);
      expect(req.user.exp).toBe(1234571490);
    });
  });
});
