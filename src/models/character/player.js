import Character from './character.js';

export default class Player extends Character {

    constructor(name,className){
        super(name);
        this.className = className;
        this.level = 1;
        this.exp = 0;
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

    get className() {
        return this._className;
    }

    set className(value) {
        this._className = value;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
    }

    get exp() {
        return this._exp;
    }

    set exp(value) {
        this._exp = value;
    }

    get armor() {
        return this._armor;
    }

    set armor(value) {
        this._armor = value;
    }

    get weapon() {
        return this._weapon;
    }

    set weapon(value) {
        this._weapon = value;
    }

    get capacity() {
        return this._capacity;
    }

    set capacity(value) {
        this._capacity = value;
    }

    get inventory() {
        return this.inventory;
    }

    set inventory(value) {
        this._inventory = value;
    }

    get perception() {
        return this.perception;
    }

    set perception(value) {
        this._perception = value;
    }

    get knowledge() {
        return this.knowledge;
    }

    set knowledge(value) {
        this._knowledge = value;
    }

    get athletics() {
        return this._athletics;
    }

    set athletics(value) {
        this._athletics = value;
    }

    get stealth() {
        return this._stealth;
    }

    set stealth(value) {
        this._stealth = value;
    }

    get cunning() {
        return this._cunning;
    }

    set cunning(value) {
        this._cunning = value;
    }

    get diplomacy() {
        return this._diplomacy;
    }

    set diplomacy(value) {
        this._diplomacy = value;
    }

}