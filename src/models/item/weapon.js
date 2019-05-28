// Inherits from item
//TODO weapon type, die, bonus
import Item from './item.js'

export default class Weapon extends Item {

    constructor(name,description,value,damageDie,dieAmmount,bonus) {
        super(name,description,value);
        this.damageDie = damageDie;
        this.dieAmmount = dieAmmount;
        this.bonus = bonus;
    }

}