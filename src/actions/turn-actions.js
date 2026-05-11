/**
 * Action type constant for incrementing the turn counter.
 * Dispatched after each player action that consumes game time.
 * @type {string}
 */
export const INCREMENT_TURN = 'turn:incrementTurn';

/**
 * Action creator for incrementing the game turn counter.
 * Used to track game progression and trigger time-based mechanics.
 * 
 * @function incrementTurn
 * @returns {Object} Redux action object for dispatching
 * @returns {string} returns.type - Action type 'turn:incrementTurn'
 * 
 * @description
 * Dispatches an action to increment the turn counter by 1.
 * No payload needed as turnReducer just increments the numeric state.
 * Call this after:
 * - Player moves to a new room
 * - Combat action is taken
 * - NPC takes an action
 * - Time-consuming items are used
 * 
 * @example
 * // Player attacks in combat
 * calculateDamage();
 * dispatch(updatePlayer(updatedPlayer));
 * dispatch(incrementTurn());  // Turn counter goes from 5 to 6
 * 
 * // After multiple actions
 * dispatch(incrementTurn());  // 6 → 7
 * dispatch(incrementTurn());  // 7 → 8
 */
export function incrementTurn() {
    return {
        type: INCREMENT_TURN
    }
}