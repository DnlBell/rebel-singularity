export class Skill {

    constructor(name){
        this.name = name;
        this.rank = 1;
    }

    addRank(value){
        this.rank = this.rank + value;
    }
}