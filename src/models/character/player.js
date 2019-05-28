import Character from './character.js';

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