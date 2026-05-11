import Item from './item.js';

/**
 * Weapon item class extending Item.
 * Represents equippable weapons used in combat with randomized damage calculation.
 * 
 * @class Weapon
 * @extends Item
 * @param {string} name - Weapon name (e.g., 'Iron Sword', 'Longbow')
 * @param {string} description - Weapon flavor text
 * @param {number} value - Gold value
 * @param {number} damageDie - Die type for damage rolls (e.g., 6 for d6, 8 for d8, 20 for d20)
 * @param {number} dieAmmount - Number of dice rolled for damage (e.g., 2d6 = 2 dice)
 * @param {number} bonus - Flat damage bonus added to dice roll results
 * 
 * @property {number} damageDie - Die size for damage calculation
 * @property {number} dieAmmount - Number of damage dice to roll
 * @property {number} bonus - Fixed damage modifier
 * 
 * @example
 * const sword = new Weapon('Iron Sword', 'A sturdy iron blade', 50, 6, 1, 2);
 * // Damage calculation: roll 1d6 + 2 bonus = 3-8 damage
 * 
 * const greataxe = new Weapon('Greataxe', 'A massive two-handed axe', 200, 12, 2, 3);
 * // Damage calculation: roll 2d12 + 3 bonus = 5-27 damage
 */
export default class Weapon extends Item {

    constructor(name,description,value,damageDie,dieAmmount,bonus) {
        super(name,description,value);
        this.damageDie = damageDie;
        this.dieAmmount = dieAmmount;
        this.bonus = bonus;
    }

}