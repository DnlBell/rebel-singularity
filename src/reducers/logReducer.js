import {UPDATE_LOG} from '../actions/log-actions.js';

/**
 * Redux reducer managing the game event log.
 * Maintains a growing array of game messages displayed to the player.
 * Messages accumulate throughout gameplay and never disappear (they scroll in the UI).
 * 
 * @function logReducer
 * @param {Array<string>} state - Array of log message strings
 *                               Starts with opening narrative text
 * @param {Object} action - Redux action object
 * @param {string} action.type - Action type identifier
 * @param {string} action.payload - The log message string to append
 * 
 * @returns {Array<string>} Updated log array with new message appended
 * 
 * @description
 * Immutably appends new messages to the log array. Using array spread operator
 * ensures Redux detects state changes. Messages are added without modification.
 * Message timestamping or filtering should happen in action creators if needed.
 * 
 * @example
 * // Initial state (from App.js)
 * // state = ['You awaken to the sound of gas depressurizing...']
 * 
 * // Player defeats enemy
 * dispatch({ type: 'log:updateLog', payload: 'You defeated the Goblin!' });
 * // state = ['You awaken...', 'You defeated the Goblin!']
 * 
 * // Throughout gameplay, messages accumulate
 * dispatch({ type: 'log:updateLog', payload: 'Found 50 gold coins.' });
 * dispatch({ type: 'log:updateLog', payload: 'Leveled up to 2!' });
 * dispatch({ type: 'log:updateLog', payload: 'Equipped Iron Sword.' });
 * // state = ['You awaken...', 'You defeated...', 'Found 50...', 'Leveled...', 'Equipped...']
 */
export default function logReducer(state = [], {type , payload}) {

    switch(type) {
        case UPDATE_LOG:
            return [...state, payload];
        default:
            return state;
    }

}