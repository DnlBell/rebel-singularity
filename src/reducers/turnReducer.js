import {INCREMENT_TURN} from '../actions/turn-actions.js'

export default function turnReducer(state = 0, {type}) {

    switch(type) {
        case INCREMENT_TURN:
            return state + 1;
        default:
            return state;
    }

}