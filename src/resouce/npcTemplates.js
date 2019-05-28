import Npc from '../models/character/npc.js';

export const testNpc = () => {
    const testNpc = new Npc("Test Dummy");
    testNpc.isHostile = true;
    return testNpc;
}