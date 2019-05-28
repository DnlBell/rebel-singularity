import Room from "../models/room/room.js";
import {testDoor} from "./doorTemplates";
import {testContainer} from "./containerTemplates";
import {testNpc} from "./npcTemplates" 

export const testRoom = () =>{
    const testRoom = new Room();
    testRoom.characters.push(testNpc());
    testRoom.doors.push(testDoor());
    testRoom.containers.push(testContainer());
    testRoom.description = "Test description";
    return (testRoom);
}