import Stats from './stats.js';
import Skill from './skill.js';

class Character {

    constructor(name, stats){
        this.name = name;
        this.stats = stats;
        this.skills = [];
        this.hp = 0;
        this.mp = 0;       
    }

    addStat(name,value){
        this.stats[name] += value;
    }

    addSkill(skill){
        this.skills.push(skill);
    }
}