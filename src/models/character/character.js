export class Character {

    constructor(name){
        this.name = name;
        this.str = 10;
        this.dex = 10; 
        this.con = 10;
        this.int = 10;
        this.wis = 10;
        this.cha = 10;
        this.hp = 10;
        this.mp = 5;
        this.ac = 10;
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

    get str() {
        return this.str;
    }

    set str(str) {
        this.str = str;
    }

    get dex() {
        return this.dex;
    }

    set dex(dex) {
        this.dex = dex;
    }

    get con() {
        return this.con;
    }

    set con(con) {
        this.con = con;
    }

    get int() {
        return this.int;
    }

    set int(int) {
        this.int = int;
    }

    get wis() {
        return this.wis;
    }

    set wis(wis) {
        this.wis = wis;
    }

    get cha() {
        return this.cha;
    }

    set cha(cha) {
        this.cha = cha;
    }

    get hp() {
        return this.hp;
    }

    set hp(hp) {
        this.hp = hp;
    }

    get ac() {
        return this.ac;
    }

    set ac(ac) {
        this.ac = ac;
    }

    get mp() {
        return this.mp;
    }

    set mp(mp) {
        this.mp = mp;
    }
}