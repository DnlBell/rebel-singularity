// Inherits from item
//TODO weapon type, die, bonus
import Item from './item.js'

export class Weapon extends Item {

    constructor(name,description,value,damageDie,dieAmmount,bonus) {
        super(name,description,value);
        this.damageDie = damageDie;
        this.dieAmmount = dieAmmount;
        this.bonus = bonus;
    }

    set damageDie(die) {
        this.damageDie = die;
    }

    get damageDie() {
        return this.damageDie;
    }

    set dieAmmount(dieAmmount) {
        this.dieAmmount = dieAmmount;
    }

    get dieAmmount() {
        return this.dieAmmount;
    }
    
    set bonus(bonus) {
        this.bonus = bonus;
    }

    get bonus() {
        return this.bonus;
    }

}