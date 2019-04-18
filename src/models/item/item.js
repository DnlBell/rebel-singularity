//TODO: Item name, description, value(?)

export class Item {

    constructor(name,description,value){
        this.name = name;
        this.description = description;
        this.value = value;
    }

    set name(name){
        this.name = name;
    }

    get name(){
        return this.name;
    }

    set description(description){
        this.description = description;
    }

    get description(){
        return this.description;
    }

    set value(value){
        this.value = value;
    }

    get value(){
        return this.value;
    }
}