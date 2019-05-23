//Rooms contain encounter elements such as enemies or non player
//characters, containers like chests or crates, or other 
//inspectable items. Every room will have at least one door, 
//connecting it to the rest of a dungeon.

export default class Room {

    constructor(){
        this.doors = [];
        this.enemies = [];
        this.containers = [];
        this.description = "";
    }

}