//containters are objects in a room that may contain items

export default class Container {

    constructor(){
        this.items = [];
        this.locked = false;
        this.difficulty = 0;
        this.name = "";
    }
    
}