import container from  '../models/room/container.js';
import {blueSquare} from './itemTemplates.js';

export const testContainer = () =>{
    const testContainer = new container();
    testContainer.locked = true;
    testContainer.name = "Test Pod";
    testContainer.items.push(blueSquare());
    return testContainer;
} 