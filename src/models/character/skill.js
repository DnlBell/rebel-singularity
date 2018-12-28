class Skill {

    constructor(name){
        this.name = name;
        this.rank = 0;
        this.modifier = 0;
    }

    addRank(value){
        this.rank = this.rank + value;
    }

    addModifier(value){
        this.modifier += value; 
    }

    removeModifier(value){
        this.modifier -= value;
    }
}