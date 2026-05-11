/**
 * Action type constant for updating the dungeon state.
 * Dispatched when the dungeon layout, player position, or combat state changes.
 * @type {string}
 */
export const UPDATE_DUNGEON = 'dungeon:updateDungeon';

/**
 * Action creator for updating the dungeon.
 * 
 * @function updateDungeon
 * @param {Object} newDungeon - Updated dungeon object to set in state
 * @param {Array<Room>} newDungeon.map - Array of Room objects
 * @param {number} newDungeon.currentPosition - Current player room index
 * @param {boolean} newDungeon.inCombat - Whether combat is active
 * 
 * @returns {Object} Redux action object for dispatching
 * @returns {string} returns.type - Action type 'dungeon:updateDungeon'
 * @returns {Object} returns.payload - Contains the newDungeon
 * 
 * @example
 * // Player moves to new room
 * const nextRoom = currentDungeon.map[currentDungeon.currentPosition].doors[0].exit;
 * const updatedDungeon = { ...currentDungeon, currentPosition: nextRoom };
 * dispatch(updateDungeon(updatedDungeon));
 * 
 * // Combat starts
 * const combatDungeon = { ...currentDungeon, inCombat: true };
 * dispatch(updateDungeon(combatDungeon));
 */
export function updateDungeon(newDungeon) {
    return {
        type: UPDATE_DUNGEON,
        payload: newDungeon
    }
}