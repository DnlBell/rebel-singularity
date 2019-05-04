
import Item from './item.js'

export class Armor extends Item {

    constructor(name,value,description,armorClass) {
        super(name,value,description);
        this.armorClass = armorClass;
    }

    set armorClass(value){
        this._armorClass = value;
    }
    get armorClass() {
        return this._armorClass;
    }
}