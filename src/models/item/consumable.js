import Item from './item.js';

/**
 * Consumable item class extending Item.
 * Represents single-use items like potions, food, and elixirs that provide temporary or permanent effects.
 * Consumables are used (consumed) during gameplay and removed from inventory.
 * 
 * @class Consumable
 * @extends Item
 * 
 * @property {*} effect - (Inherited from Item, extendable) Effect applied when item is consumed
 *                        Typically restores HP, MP, or applies temporary buffs
 * 
 * @example
 * const healthPotion = new Consumable('Health Potion', 'A shimmering red liquid', 25);
 * // When used: restore 20 HP, remove from inventory
 * 
 * const manaPotion = new Consumable('Mana Potion', 'A swirling blue liquid', 30);
 * // When used: restore 15 MP, remove from inventory
 */
export default class Consumable extends Item {

}