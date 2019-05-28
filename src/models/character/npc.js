import Character from './character.js';

export default class Npc extends Character {

    constructor(name){
        super(name);
        this.isHostile = false;
        this.description = "";
    }

}
