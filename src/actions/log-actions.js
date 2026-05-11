/**
 * Action type constant for appending to the game log.
 * Dispatched whenever a game event message should be displayed to the player.
 * @type {string}
 */
export const UPDATE_LOG = 'log:updateLog';

/**
 * Action creator for adding a message to the game event log.
 * Appends a single message string to the log array.
 * 
 * @function updateLog
 * @param {string} newAction - The log message to append
 *                             Examples: 'You defeated the goblin!', 'Found 50 gold.'
 * 
 * @returns {Object} Redux action object for dispatching
 * @returns {string} returns.type - Action type 'log:updateLog'
 * @returns {string} returns.payload - The message string
 * 
 * @description
 * Messages are displayed in the Log widget in the order they were dispatched.
 * All messages are kept and displayed (no limit). Consider clearing the log
 * between dungeon levels if the log gets too long.
 * 
 * @example
 * // Player defeats an enemy
 * dispatch(updateLog('You defeated the Goblin Scout!'));
 * // Log now shows: [...previous messages, 'You defeated the Goblin Scout!']
 * 
 * // Player takes damage
 * dispatch(updateLog('You took 8 damage from the Orc Warrior.'));
 * 
 * // Multiple messages
 * dispatch(updateLog('You found a chest.'));
 * dispatch(updateLog('The chest contained 100 gold and a sword.'));
 * dispatch(updateLog('You gained 300 experience points.'));
 */
export function updateLog(newAction) {
    return {
        type: UPDATE_LOG,
        payload: newAction
    }
}