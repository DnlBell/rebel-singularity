import {UPDATE_LOG} from '../actions/log-actions.js'

export default function logReducer(state = [], {type , payload}) {

    switch(type) {
        case UPDATE_LOG:
            return [...state, payload];
        default:
            return state;
    }

}