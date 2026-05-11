import {UPDATE_DUNGEON} from '../actions/dungeon-actions';

/**
 * Redux reducer managing the dungeon state.
 * Handles updates to dungeon layout, player position, and combat state.
 * 
 * @function dungeonReducer
 * @param {Object} state - Current Dungeon object (map layout, position, combat state)
 *                        Defaults to {} when store initializes
 * @param {Object} action - Redux action object
 * @param {string} action.type - Action type identifier
 * @param {Object} action.payload - Action payload data
 * @param {Object} action.payload.dungeon - New dungeon state to set
 * 
 * @returns {Object} Updated Dungeon state (new Dungeon instance)
 * 
 * @example
 * // Player moves through a door
 * const updatedDungeon = { ...currentDungeon, currentPosition: 2 };
 * dispatch(updateDungeon({ dungeon: updatedDungeon }));
 * 
 * // Combat starts
 * const inCombatDungeon = { ...currentDungeon, inCombat: true };
 * dispatch(updateDungeon({ dungeon: inCombatDungeon }));
 * 
 * // Generate new dungeon level
 * dispatch(updateDungeon({ dungeon: newProceduralDungeon() }));
 */
export default function dungeonReducer(state = {}, { type, payload }) {

    switch (type) {
      case UPDATE_DUNGEON:
        return payload.dungeon;
      default:
        return state;
    }
    
  }