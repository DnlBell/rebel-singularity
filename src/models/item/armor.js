
import Item from './item.js'

export class Armor extends Item {

    constructor(name,value,description,armorClass) {
        super(name,value,description);
        this.armorClass = armorClass;
    }

    set armorClass(armorClass){
        this.armorClass = armorClass;
    }
    get armorClass() {
        return this.armorClass;
    }
}