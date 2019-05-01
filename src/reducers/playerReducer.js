import {UPDATE_PLAYER} from '../actions/player-actions.js'

export default function playerReducer(state = {}, { type, payload }) {

    switch (type) {
      case UPDATE_PLAYER:
        return payload.user;
      default:
        return state;
    }
    
  }