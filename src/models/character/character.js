export default class Character {

    constructor(name){
        this.name = name;
        this.str = 10;
        this.dex = 10; 
        this.con = 10;
        this.int = 10;
        this.wis = 10;
        this.cha = 10;
        this.maxhp = 10;
        this.currentHp = 10;
        this.maxMp = 5;
        this.currentMp = 5;
        this.ac = 10;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get str() {
        return this._str;
    }

    set str(value) {
        this._str = value;
    }

    get dex() {
        return this._dex;
    }

    set dex(value) {
        this._dex = value;
    }

    get con() {
        return this._con;
    }

    set con(value) {
        this._con = value;
    }

    get int() {
        return this._int;
    }

    set int(value) {
        this._int = value;
    }

    get wis() {
        return this._wis;
    }

    set wis(value) {
        this._wis = value;
    }

    get cha() {
        return this._cha;
    }

    set cha(value) {
        this._cha = value;
    }

    get maxhp() {
        return this._maxhp;
    }

    set maxhp(value) {
        this._maxhp = value;
    }

    get currentHp() {
        return this._currentHp;
    }

    set currentHp(value) {
        this._currentHp = value;
    }


    get maxMp() {
        return this._mp;
    }

    set maxMp(value) {
        this._maxMp = value;
    }

    get currentMp() {
        return this._currentMp;
    }

    set currentMp(value) {
        this._currentMp = value;
    }
    
    get ac() {
        return this._ac;
    }

    set ac(value) {
        this._ac = value;
    }
}