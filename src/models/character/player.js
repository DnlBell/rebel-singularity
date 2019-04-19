import Character from './character.js';

export class Player extends Character {

    constructor(name){
        super(name);
        this.armor = {};
        this.weapon = {};
        this.capacity = 5;
        this.inventory = [];
        this.perception = 0;
        this.knowledge = 0;
        this.athletics = 0;
        this.stealth = 0;
        this.cunning = 0;
        this.diplomacy = 0;
    }

    get armor() {
        return this.armor;
    }

    set armor(armor) {
        this.armor = armor;
    }

    get weapon() {
        return this.weapon;
    }

    set weapon(weapon) {
        this.weapon = weapon;
    }

    get capacity() {
        return this.capacity;
    }

    set capacity(capacity) {
        this.capacity = capacity;
    }

    get inventory() {
        return this.inventory;
    }

    set inventory(inventory) {
        this.inventory = inventory;
    }

    get perception() {
        return this.perception;
    }

    set perception(perception) {
        this.perception = perception;
    }

    get knowledge() {
        return this.knowledge;
    }

    set knowledge(knowledge) {
        this.knowledge = knowledge;
    }

    get athletics() {
        return this.athletics;
    }

    set athletics(athletics) {
        this.athletics = athletics;
    }

    get stealth() {
        return this.stealth;
    }

    set stealth(stealth) {
        this.stealth = stealth;
    }

    get cunning() {
        return this.cunning;
    }

    set cunning(cunning) {
        this.cunning = cunning;
    }

    get diplomacy() {
        return this.diplomacy;
    }

    set diplomacy(diplomacy) {
        this.diplomacy = diplomacy;
    }


}