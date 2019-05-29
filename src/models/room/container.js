//containters are objects in a room that may contain items

export default class Container {

    constructor(){
        this.items = [];
        this.locked = false;
        this.hidden = false;
        this.open = false;
        this.lock = 0;
        this.hide = 0;
        this.name = "";
    }
    
}