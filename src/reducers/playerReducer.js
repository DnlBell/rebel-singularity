import {UPDATE_PLAYER} from '../actions/player-actions.js';

/**
 * Redux reducer managing the player state.
 * Handles updates to the player character, including stats, level, experience, and inventory.
 * 
 * @function playerReducer
 * @param {Object|string} state - Current state (Player object or 'empty' if not created)
 *                               Defaults to {} when store initializes
 * @param {Object} action - Redux action object
 * @param {string} action.type - Action type identifier
 * @param {Object} action.payload - Action payload data
 * @param {Object} action.payload.player - New player state to set
 * 
 * @returns {Object|string} Updated player state (Player object or 'empty')
 * 
 * @example
 * // Character creation: player state 'empty' → Player object
 * dispatch({
 *   type: 'player:updatePlayer',
 *   payload: { player: new Player('Kaine', 'Enforcer') }
 * });
 * // State changes from 'empty' to Player instance
 * 
 * // Character gains XP: update player with new level/exp
 * const updatedPlayer = { ...currentPlayer, exp: 150, level: 2 };
 * dispatch(updatePlayer({ player: updatedPlayer }));
 */
export default function playerReducer(state = {}, { type, payload }) {

    switch (type) {
      case UPDATE_PLAYER:
        return payload.player;
      default:
        return state;
    }
    
  }