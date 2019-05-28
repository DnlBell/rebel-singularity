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