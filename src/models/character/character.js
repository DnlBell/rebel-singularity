/**
 * Base class for all combat-capable entities (Player and NPC).
 * Manages character attributes, health, mana, armor class, skills, and equipment.
 * 
 * @class Character
 * @param {string} name - The character's display name
 * 
 * @property {string} name - Character's display name
 * @property {number} str - Strength attribute (affects melee damage, carrying capacity)
 * @property {number} dex - Dexterity attribute (affects AC, ranged damage, initiative)
 * @property {number} con - Constitution attribute (affects max HP and endurance)
 * @property {number} int - Intelligence attribute (affects knowledge checks, spellcasting)
 * @property {number} wis - Wisdom attribute (affects perception, insight)
 * @property {number} cha - Charisma attribute (affects diplomacy, persuasion)
 * @property {number} maxHp - Maximum health points
 * @property {number} currentHp - Current health points (0 = dead)
 * @property {number} maxMp - Maximum mana points for spellcasting
 * @property {number} currentMp - Current mana points
 * @property {number} ac - Armor Class (lower is better, reduces incoming damage)
 * @property {number} perception - Skill modifier for detecting hidden enemies/items
 * @property {number} knowledge - Skill modifier for understanding lore and secrets
 * @property {number} athletics - Skill modifier for physical movement and endurance
 * @property {number} stealth - Skill modifier for sneaking and hiding
 * @property {number} cunning - Skill modifier for deception and thievery
 * @property {number} diplomacy - Skill modifier for persuading NPCs
 * @property {Object} armor - Equipped armor item (empty object if unequipped)
 * @property {Object} weapon - Equipped weapon item (empty object if unequipped)
 * @property {boolean} stealthed - Whether character is currently hidden/sneaking
 * @property {number} stealthRating - Concealment rating (higher = more hidden)
 */
export default class Character {

    constructor(name){
        this.name = name;
        this.str = 10;
        this.dex = 10; 
        this.con = 10;
        this.int = 10;
        this.wis = 10;
        this.cha = 10;
        this.maxHp = 10;
        this.currentHp = 10;
        this.maxMp = 5;
        this.currentMp = 5;
        this.ac = 10;
        this.perception = 0;
        this.knowledge = 0;
        this.athletics = 0;
        this.stealth = 0;
        this.cunning = 0;
        this.diplomacy = 0;
        this.armor = {};
        this.weapon = {};
        this.stealthed = false;
        this.stealthRating = 0;
    }

}