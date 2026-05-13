import apiClient from '../api/client';

let saveTimeout = null;
let lastSaveTime = 0;
const DEBOUNCE_MS = 1500; // Wait 1.5 seconds before saving

const savePersistenceMiddleware = (store) => (next) => (action) => {
  // Call the next middleware/reducer first
  const result = next(action);

  // If this is a turn increment, schedule a save
  if (action.type === 'turn:incrementTurn') {
    const now = Date.now();

    // Clear any pending save to avoid duplicates
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    // Schedule a new save
    saveTimeout = setTimeout(() => {
      const state = store.getState();
      performSave(state);
      saveTimeout = null;
    }, DEBOUNCE_MS);
  }

  return result;
};

const performSave = async (state) => {
  const gameState = {
    player: state.player,
    dungeon: state.dungeon,
    log: state.log,
    turn: state.turn
  };

  try {
    // Check if user is logged in
    const token = apiClient.getTokenFromStorage();
    if (!token) {
      // User is not logged in, save to localStorage instead
      saveToLocalStorage(gameState);
      return;
    }

    // Save to server
    await apiClient.saveGame(gameState);
    console.log('✓ Game saved to server at turn', state.turn);
    lastSaveTime = Date.now();
  } catch (err) {
    console.warn('⚠ Failed to save game to server:', err.message);
    // Fallback to localStorage
    saveToLocalStorage(gameState);
  }
};

const saveToLocalStorage = (gameState) => {
  try {
    localStorage.setItem('game_state_backup', JSON.stringify(gameState));
    console.log('✓ Game backed up to localStorage (offline mode)');
  } catch (err) {
    console.error('✗ Failed to backup game to localStorage:', err);
  }
};

export default savePersistenceMiddleware;
