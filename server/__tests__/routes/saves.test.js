const request = require('supertest');
const express = require('express');
const savesRoutes = require('../../routes/saves');

// Mock jwt for authentication
jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

describe('Saves Routes', () => {
  let app;
  let mockPool;
  let mockUser;

  beforeEach(() => {
    // Create fresh app for each test
    app = express();
    app.use(express.json());

    mockPool = {
      query: jest.fn()
    };

    mockUser = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser'
    };

    app.locals.pool = mockPool;
    app.use('/api/saves', savesRoutes);

    // Error handler
    app.use((err, req, res, next) => {
      res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
      });
    });

    // Mock JWT verification
    jwt.verify = jest.fn();
    jest.clearAllMocks();
  });

  describe('GET /api/saves', () => {
    it('should list all saves for authenticated user', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      mockPool.query.mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            turn_count: 10,
            created_at: '2024-01-01T10:00:00Z',
            last_modified: '2024-01-01T15:00:00Z',
            character_class: 'Warrior',
            level: '5'
          },
          {
            id: 2,
            turn_count: 20,
            created_at: '2024-01-02T10:00:00Z',
            last_modified: '2024-01-02T15:00:00Z',
            character_class: 'Mage',
            level: '3'
          }
        ]
      });

      const res = await request(app)
        .get('/api/saves')
        .set('Authorization', 'Bearer valid-token');

      expect(res.status).toBe(200);
      expect(res.body.saves).toHaveLength(2);
      expect(res.body.saves[0].character_class).toBe('Warrior');
      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT id, turn_count'),
        [mockUser.id]
      );
    });

    it('should return empty array when user has no saves', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      mockPool.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/saves')
        .set('Authorization', 'Bearer valid-token');

      expect(res.status).toBe(200);
      expect(res.body.saves).toEqual([]);
    });

    it('should reject request without authorization token', async () => {
      const res = await request(app)
        .get('/api/saves');

      expect(res.status).toBe(401);
      expect(res.body.error).toContain('No token');
    });

    it('should reject request with invalid token', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error('Invalid token'));
      });

      const res = await request(app)
        .get('/api/saves')
        .set('Authorization', 'Bearer invalid-token');

      expect(res.status).toBe(403);
      expect(res.body.error).toContain('Invalid');
    });

    it('should order saves by last_modified DESC', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      mockPool.query.mockResolvedValueOnce({
        rows: [
          {
            id: 2,
            turn_count: 50,
            last_modified: '2024-01-02T15:00:00Z',
            character_class: 'Mage',
            level: '10'
          },
          {
            id: 1,
            turn_count: 10,
            last_modified: '2024-01-01T15:00:00Z',
            character_class: 'Warrior',
            level: '5'
          }
        ]
      });

      const res = await request(app)
        .get('/api/saves')
        .set('Authorization', 'Bearer valid-token');

      expect(res.status).toBe(200);
      expect(res.body.saves[0].id).toBe(2);
      expect(res.body.saves[1].id).toBe(1);
    });
  });

  describe('GET /api/saves/latest', () => {
    it('should return most recent save', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      const mockState = {
        player: { className: 'Warrior', level: 5, hp: 100 },
        dungeon: { currentRoom: 0, rooms: [] },
        log: ['Game started', 'Entered first room']
      };

      mockPool.query.mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            player_json: mockState.player,
            dungeon_json: mockState.dungeon,
            log_json: mockState.log,
            turn_count: 10,
            last_modified: '2024-01-01T15:00:00Z'
          }
        ]
      });

      const res = await request(app)
        .get('/api/saves/latest')
        .set('Authorization', 'Bearer valid-token');

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
      expect(res.body.state.player).toEqual(mockState.player);
      expect(res.body.state.dungeon).toEqual(mockState.dungeon);
      expect(res.body.state.log).toEqual(mockState.log);
      expect(res.body.state.turn).toBe(10);
    });

    it('should return 404 when no saves found', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      mockPool.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/saves/latest')
        .set('Authorization', 'Bearer valid-token');

      expect(res.status).toBe(404);
      expect(res.body.error).toContain('No saves found');
    });

    it('should reject request without token', async () => {
      const res = await request(app)
        .get('/api/saves/latest');

      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/saves', () => {
    const mockSaveData = {
      player: { className: 'Warrior', level: 5, hp: 100 },
      dungeon: { currentRoom: 0, rooms: [] },
      log: ['Game started'],
      turn: 1
    };

    it('should create new save for user', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // Check existing save
        .mockResolvedValueOnce({
          rows: [
            {
              id: 100,
              last_modified: '2024-01-01T10:00:00Z'
            }
          ]
        }); // Create new save

      const res = await request(app)
        .post('/api/saves')
        .set('Authorization', 'Bearer valid-token')
        .send(mockSaveData);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(100);
      expect(res.body.message).toContain('created');
      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO player_saves'),
        expect.arrayContaining([
          mockUser.id,
          JSON.stringify(mockSaveData.player),
          JSON.stringify(mockSaveData.dungeon),
          JSON.stringify(mockSaveData.log),
          mockSaveData.turn
        ])
      );
    });

    it('should update existing save', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      mockPool.query
        .mockResolvedValueOnce({
          rows: [{ id: 50 }] // Existing save found
        })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 50,
              last_modified: '2024-01-01T15:00:00Z'
            }
          ]
        }); // Update save

      const res = await request(app)
        .post('/api/saves')
        .set('Authorization', 'Bearer valid-token')
        .send({ ...mockSaveData, turn: 25 });

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(50);
      expect(res.body.message).toContain('updated');
      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE player_saves'),
        expect.arrayContaining([
          JSON.stringify(mockSaveData.player),
          JSON.stringify(mockSaveData.dungeon),
          JSON.stringify(mockSaveData.log),
          25,
          50,
          mockUser.id
        ])
      );
    });

    it('should reject save without player data', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      const res = await request(app)
        .post('/api/saves')
        .set('Authorization', 'Bearer valid-token')
        .send({
          dungeon: mockSaveData.dungeon,
          log: mockSaveData.log,
          turn: mockSaveData.turn
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Player');
    });

    it('should reject save without dungeon data', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      const res = await request(app)
        .post('/api/saves')
        .set('Authorization', 'Bearer valid-token')
        .send({
          player: mockSaveData.player,
          log: mockSaveData.log,
          turn: mockSaveData.turn
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('dungeon');
    });

    it('should reject save without log array', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      const res = await request(app)
        .post('/api/saves')
        .set('Authorization', 'Bearer valid-token')
        .send({
          player: mockSaveData.player,
          dungeon: mockSaveData.dungeon,
          turn: mockSaveData.turn
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('log');
    });

    it('should reject save with log as non-array', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      const res = await request(app)
        .post('/api/saves')
        .set('Authorization', 'Bearer valid-token')
        .send({
          player: mockSaveData.player,
          dungeon: mockSaveData.dungeon,
          log: 'not an array',
          turn: mockSaveData.turn
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('log');
    });

    it('should reject save without turn number', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      const res = await request(app)
        .post('/api/saves')
        .set('Authorization', 'Bearer valid-token')
        .send({
          player: mockSaveData.player,
          dungeon: mockSaveData.dungeon,
          log: mockSaveData.log
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('turn');
    });

    it('should reject request without token', async () => {
      const res = await request(app)
        .post('/api/saves')
        .send(mockSaveData);

      expect(res.status).toBe(401);
    });

    it('should handle complex game state JSON', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      const complexData = {
        player: {
          className: 'Warrior',
          level: 15,
          hp: 150,
          maxHp: 150,
          mana: 50,
          stats: {
            strength: 18,
            dexterity: 12,
            constitution: 16,
            intelligence: 10,
            wisdom: 14,
            charisma: 11
          },
          inventory: [
            { id: 1, name: 'Sword', type: 'weapon' },
            { id: 2, name: 'Shield', type: 'armor' }
          ]
        },
        dungeon: { currentRoom: 5, rooms: [] },
        log: ['Many', 'log', 'entries'],
        turn: 100
      };

      mockPool.query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({
          rows: [{ id: 101, last_modified: '2024-01-01T10:00:00Z' }]
        });

      const res = await request(app)
        .post('/api/saves')
        .set('Authorization', 'Bearer valid-token')
        .send(complexData);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(101);
    });
  });

  describe('DELETE /api/saves/:id', () => {
    it('should delete save belonging to authenticated user', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      mockPool.query.mockResolvedValueOnce({
        rows: [{ id: 50 }]
      });

      const res = await request(app)
        .delete('/api/saves/50')
        .set('Authorization', 'Bearer valid-token');

      expect(res.status).toBe(200);
      expect(res.body.message).toContain('deleted');
      expect(res.body.id).toBe(50);
      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining('DELETE FROM player_saves'),
        ['50', mockUser.id] // ID comes as string from route params
      );
    });

    it('should return 404 when save not found', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      mockPool.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .delete('/api/saves/999')
        .set('Authorization', 'Bearer valid-token');

      expect(res.status).toBe(404);
      expect(res.body.error).toContain('not found');
    });

    it('should prevent deleting other users saves', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, mockUser);
      });

      // Simulate saving belongs to different user
      mockPool.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .delete('/api/saves/999')
        .set('Authorization', 'Bearer valid-token');

      expect(res.status).toBe(404);
      expect(res.body.error).toContain('unauthorized');
    });

    it('should reject delete without token', async () => {
      const res = await request(app)
        .delete('/api/saves/50');

      expect(res.status).toBe(401);
    });

    it('should reject delete with invalid token', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error('Invalid token'));
      });

      const res = await request(app)
        .delete('/api/saves/50')
        .set('Authorization', 'Bearer invalid-token');

      expect(res.status).toBe(403);
    });
  });
});
