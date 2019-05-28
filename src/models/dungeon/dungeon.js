//the dungeon object stores a 2d array of rooms that serves 
//as the dungeon map.   

export default class Dungeon {
    
    constructor() {
        this.map = [];
        this.inCombat = false;
        this.currentPosition = 0;
    }

}