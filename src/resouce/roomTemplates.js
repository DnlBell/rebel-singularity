import Room from "../models/room/room.js";
import {testDoor} from "./doorTemplates";
import {testContainer} from "./containerTemplates";
import {testNpc} from "./npcTemplates" 

export const testRoom = () =>{
    const testRoom = new Room();
    testRoom.characters.push(testNpc());
    testRoom.characters.push(testNpc());
    testRoom.doors.push(testDoor());
    testRoom.containers.push(testContainer());
    testRoom.generalDescription = "bland and uninteresting.";
    return (testRoom);
}