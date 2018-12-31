export class Character {

    constructor(name){
        this.name = name;
        this.str = 10;
        this.dex = 10; 
        this.con = 10;
        this.int = 10;
        this.wis = 10;
        this.cha = 10;
        this.skills = [];
        this.hp = 10;
        this.mp = 5;
        this.ac = 10;       
    }

    addSkill(skill){
        this.skills.push(skill);
    }
}