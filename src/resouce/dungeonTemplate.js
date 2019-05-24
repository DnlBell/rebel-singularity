import Dungeon from '../models/dungeon/dungeon.js';
import {testRoom} from './roomTemplates.js'


export const testDungeon = () =>{
    const testDungeon = new Dungeon();
    testDungeon.map.push(testRoom());
    return (testDungeon);
}