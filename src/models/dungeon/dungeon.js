//the dungeon object stores a 2d array of rooms that serves 
//as the dungeon map.   

export class Dungeon {
    
    constructor(rooms) {
        this.rooms = rooms;
    }

    set rooms(rooms) {
        this.rooms = rooms;
    }
    
    get rooms() {
        return this.rooms;
    }
}