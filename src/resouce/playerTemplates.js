import Player from '../models/character/player.js';
import {steelBat} from '../resouce/weaponTemplates.js';
import {leatherJacket} from '../resouce/armorTemplates.js'

export const createEnforcer = (name,className) => {
    const enforcer = new Player(name,className);
    enforcer.str = 14;
    enforcer.con = 14;
    enforcer.dex = 12;
    enforcer.maxHp = 12;
    enforcer.currentHp = 12;
    enforcer.maxMp = 4;
    enforcer.currentMp = 4;
    enforcer.armor = leatherJacket();
    enforcer.weapon = steelBat();
    return(enforcer);
 };

 export const createJacker = (name,classname) => {
    const jacker = new Player(name,classname);
    jacker.dex = 14;
    jacker.int = 12;
    jacker.con = 12;
    jacker.cha = 12;
    jacker.maxHp = 9;
    jacker.currentHp = 9;
    jacker.maxMp = 6;
    jacker.currentMp = 6;
    jacker.armor = leatherJacket();
    jacker.weapon = steelBat();
    return(jacker);
 };

 export const createInitiate = (name,className) => {
    const initiate = new Player(name,className);
    initiate.int = 14;
    initiate.wis = 14;
    initiate.cha = 12;
    initiate.maxHp = 8;
    initiate.currentHp = 8;
    initiate.maxMp = 10;
    initiate.currentMp = 10;
    initiate.armor = leatherJacket();
    initiate.weapon = steelBat();
    return(initiate);
 };