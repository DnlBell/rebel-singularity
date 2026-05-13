const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// GET /api/saves - List all saves for current user
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const pool = req.app.locals.pool;

    const result = await pool.query(
      `SELECT id, turn_count, created_at, last_modified, 
              player_json->>'className' as character_class,
              player_json->>'level' as level
       FROM player_saves 
       WHERE user_id = $1 
       ORDER BY last_modified DESC`,
      [req.user.id]
    );

    res.json({
      saves: result.rows
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/saves/latest - Get most recent save
router.get('/latest', authenticateToken, async (req, res, next) => {
  try {
    const pool = req.app.locals.pool;

    const result = await pool.query(
      `SELECT id, player_json, dungeon_json, log_json, turn_count, last_modified
       FROM player_saves 
       WHERE user_id = $1 
       ORDER BY last_modified DESC 
       LIMIT 1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No saves found' });
    }

    const save = result.rows[0];

    res.json({
      id: save.id,
      state: {
        player: save.player_json,
        dungeon: save.dungeon_json,
        log: save.log_json,
        turn: save.turn_count
      },
      lastModified: save.last_modified
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/saves - Create or update save
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const pool = req.app.locals.pool;
    const { player, dungeon, log, turn } = req.body;

    // Validation
    if (!player || !dungeon || !Array.isArray(log) || turn === undefined) {
      return res.status(400).json({ 
        error: 'Player, dungeon, log array, and turn number are required' 
      });
    }

    // Check if user has an existing save
    const existingSave = await pool.query(
      'SELECT id FROM player_saves WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [req.user.id]
    );

    let result;

    if (existingSave.rows.length > 0) {
      // Update existing save
      result = await pool.query(
        `UPDATE player_saves 
         SET player_json = $1, dungeon_json = $2, log_json = $3, 
             turn_count = $4, last_modified = CURRENT_TIMESTAMP
         WHERE id = $5 AND user_id = $6
         RETURNING id, last_modified`,
        [JSON.stringify(player), JSON.stringify(dungeon), JSON.stringify(log), turn, existingSave.rows[0].id, req.user.id]
      );
    } else {
      // Create new save
      result = await pool.query(
        `INSERT INTO player_saves (user_id, player_json, dungeon_json, log_json, turn_count)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, last_modified`,
        [req.user.id, JSON.stringify(player), JSON.stringify(dungeon), JSON.stringify(log), turn]
      );
    }

    const save = result.rows[0];

    res.json({
      id: save.id,
      lastModified: save.last_modified,
      message: existingSave.rows.length > 0 ? 'Save updated' : 'Save created'
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/saves/:id - Delete a save
router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const pool = req.app.locals.pool;
    const { id } = req.params;

    // Ensure user can only delete their own saves
    const result = await pool.query(
      'DELETE FROM player_saves WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Save not found or unauthorized' });
    }

    res.json({ message: 'Save deleted', id: result.rows[0].id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
