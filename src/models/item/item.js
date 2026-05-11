/**
 * Base class for all collectible items (Weapons, Armor, Consumables).
 * Represents generic items that can be placed in inventory, containers, or rooms.
 * 
 * @class Item
 * @param {string} name - Display name of the item
 * @param {string} description - Flavor text describing the item
 * @param {number} value - Gold/currency value of the item
 * 
 * @property {string} name - Display name
 * @property {string} description - Detailed description and flavor text
 * @property {number} value - Monetary value (used for selling/trading)
 */
export default class Item {

    constructor(name,description,value){
        this.name = name;
        this.description = description;
        this.value = value;
    }

}