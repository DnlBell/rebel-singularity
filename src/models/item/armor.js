import Item from './item.js';

/**
 * Armor item class extending Item.
 * Represents equippable protective gear that reduces incoming damage via Armor Class.
 * 
 * @class Armor
 * @extends Item
 * @param {string} name - Armor name (e.g., 'Leather Armor', 'Plate Mail')
 * @param {number} value - Gold value
 * @param {string} description - Flavor text about the armor
 * @param {number} armorClass - AC bonus provided (lower AC = better protection)
 * 
 * @property {number} armorClass - Armor Class value; reduces character's total AC when equipped
 * 
 * @example
 * const leatherArmor = new Armor('Leather Armor', 50, 'Light and flexible protection', 11);
 * // Equipped character AC becomes: base AC - armorClass modifier
 * 
 * const plateMail = new Armor('Plate Mail', 500, 'Heavy protective plating', 18);
 * // Best protection but may impose penalties in some mechanics
 */
export default class Armor extends Item {

    constructor(name,value,description,armorClass) {
        super(name,value,description);
        this.armorClass = armorClass;
    }

}