/**
 * Action type constant for updating the player state.
 * Dispatched whenever player stats, inventory, level, or other attributes change.
 * @type {string}
 */
export const UPDATE_PLAYER = 'player:updatePlayer';

/**
 * Action creator for updating the player character.
 * 
 * @function updatePlayer
 * @param {Object} newPlayer - Updated player object to set in state
 * @param {string} newPlayer.name - Player name
 * @param {string} newPlayer.className - Character class
 * @param {number} newPlayer.level - Current level
 * @param {number} newPlayer.exp - Experience points
 * @param {Array<Item>} newPlayer.inventory - Inventory items
 * @param {number} newPlayer.currentHp - Current health
 * @param {*} newPlayer.* - Any other Player properties
 * 
 * @returns {Object} Redux action object for dispatching
 * @returns {string} returns.type - Action type 'player:updatePlayer'
 * @returns {Object} returns.payload - Contains the newPlayer
 * 
 * @example
 * const updatedPlayer = { ...currentPlayer, exp: 150, level: 2 };
 * dispatch(updatePlayer(updatedPlayer));
 * // playerReducer will update store.state.player
 */
export function updatePlayer(newPlayer) {
    return {
        type: UPDATE_PLAYER,
        payload: newPlayer
    }
}