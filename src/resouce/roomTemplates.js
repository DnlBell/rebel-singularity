import Room from "../models/room/room.js";
import {testDoor} from "./doorTemplates";
import {testContainer} from "./containerTemplates";

export const testRoom = () =>{
    const testRoom = new Room();
    testRoom.doors.push(testDoor());
    testRoom.containers.push(testContainer());
    testRoom.description = "Test description";
    return (testRoom);
}