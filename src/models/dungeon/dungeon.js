//the dungeon object stores a 2d array of rooms that serves 
//as the dungeon map.   

export default class Dungeon {
    
    constructor() {
        this.map = [];
        this.inCombat = false;
    }

    set rooms(rooms) {
        this._rooms = rooms;
    }
    
    get rooms() {
        return this._rooms;
    }
}