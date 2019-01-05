import Character from './character.js';

export class Player extends Character {

    constructor(name){
        super(name);
        this.armor = {};
        this.weapon = {};
        this.capacity = 5;
        this.inventory = [];
    }

    
}