import {INCREMENT_TURN} from '../actions/turn-actions.js';

/**
 * Redux reducer managing the game turn counter.
 * Tracks game progression by incrementing turn number after each player action.
 * 
 * @function turnReducer
 * @param {number} state - Current turn count (integer, starts at 0)
 * @param {Object} action - Redux action object
 * @param {string} action.type - Action type identifier
 * 
 * @returns {number} Updated turn count (incremented by 1 or unchanged)
 * 
 * @description
 * The turn counter represents game progression. Each action that takes game time
 * dispatches INCREMENT_TURN to advance the counter. Used for:
 * - Tracking game progression
 * - Triggering NPC actions on certain turn intervals
 * - Managing time-based effects (e.g., poison damage, spell duration)
 * - Game logging and history
 * 
 * @example
 * // Start of game
 * // state = 0
 * 
 * // Player moves to new room
 * dispatch(incrementTurn());
 * // state = 1
 * 
 * // Multiple actions in combat
 * dispatch(incrementTurn());  // state = 2
 * dispatch(incrementTurn());  // state = 3
 * dispatch(incrementTurn());  // state = 4
 */
export default function turnReducer(state = 0, {type}) {

    switch(type) {
        case INCREMENT_TURN:
            return state + 1;
        default:
            return state;
    }

}