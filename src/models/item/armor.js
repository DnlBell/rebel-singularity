
import Item from './item.js'

export default class Armor extends Item {

    constructor(name,value,description,armorClass) {
        super(name,value,description);
        this.armorClass = armorClass;
    }

}