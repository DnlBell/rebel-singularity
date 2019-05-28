import {UPDATE_DUNGEON} from '../actions/dungeon-actions';

export default function dungeonReducer(state = {}, { type, payload }) {

    switch (type) {
      case UPDATE_DUNGEON:
        return payload.dungeon;
      default:
        return state;
    }
    
  }