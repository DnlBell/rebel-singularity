//TODO: Item name, description, value(?)

export default class Item {

    constructor(name,description,value){
        this.name = name;
        this.description = description;
        this.value = value;
    }

    set name(value){
        this._name = value;
    }

    get name(){
        return this._name;
    }

    set description(value){
        this._description = value;
    }

    get description(){
        return this._description;
    }

    set value(value){
        this._value = value;
    }

    get value(){
        return this._value;
    }
}