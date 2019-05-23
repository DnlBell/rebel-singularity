import Dungeon from '../models/dungeon/dungeon.js';
import {testRoom} from './roomTemplates.js'

const rooms = [testRoom];
export const testDungeon = new Dungeon(rooms);