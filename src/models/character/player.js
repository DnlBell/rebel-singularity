import Character from './character.js';

/**
 * Playable character class extending Character.
 * Adds progression mechanics including leveling, experience, and player-specific inventory management.
 * 
 * @class Player
 * @extends Character
 * @param {string} name - The player's character name
 * @param {string} className - Character class: 'Enforcer', 'Jacker', or 'Initiate'
 * 
 * @property {string} className - Character class providing stat bonuses
 *           - 'Enforcer': +2 STR, +2 CON, +1 DEX (tank)
 *           - 'Jacker': +2 DEX, +1 INT, +1 CON, +1 CHA (rogue)
 *           - 'Initiate': +2 INT, +2 WIS, +1 CHA (mage)
 * @property {number} level - Current character level (starts at 1)
 * @property {number} exp - Accumulated experience points (used for leveling)
 * @property {number} capacity - Inventory size limit (max items able to carry)
 * @property {Array<Object>} inventory - Array of Item objects currently carried
 * 
 * @example
 * const player = new Player('Kaine', 'Enforcer');
 * // Player adds (+2 STR, +2 CON, +1 DEX) to base stats
 */
export default class Player extends Character {

    constructor(name,className){
        super(name);
        this.className = className;
        this.level = 1;
        this.exp = 0;
        this.capacity = 5;
        this.inventory = [];
    }

}