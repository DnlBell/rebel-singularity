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

    set damageDie(value) {
        this._damageDie = value;
    }

    get damageDie() {
        return this._damageDie;
    }

    set dieAmmount(value) {
        this._dieAmmount = value;
    }

    get dieAmmount() {
        return this._dieAmmount;
    }
    
    set bonus(value) {
        this._bonus = value;
    }

    get bonus() {
        return this._bonus;
    }

}