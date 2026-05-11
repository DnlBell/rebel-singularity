import Character from './character.js';

/**
 * Non-player character class extending Character.
 * Represents enemies and NPCs in the dungeon. Includes behavior flags and descriptions.
 * 
 * @class Npc
 * @extends Character
 * @param {string} name - The NPC's name or title
 * 
 * @property {boolean} isHostile - Whether this NPC is an enemy (true) or neutral/friendly (false)
 * @property {string} description - Dialog or contextual text describing the NPC
 * @property {boolean} hidden - Whether the NPC is concealed from the player initially
 * 
 * @example
 * const goblin = new Npc('Goblin Scout');
 * goblin.isHostile = true;  // Enemy
 * goblin.description = 'A vicious goblin with a wicked grin.'
 */
export default class Npc extends Character {

    constructor(name){
        super(name);
        this.isHostile = false;
        this.description = "";
        this.hidden = false;
    }

}
