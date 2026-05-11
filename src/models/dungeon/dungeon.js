/**
 * The game world dungeon structure and state.
 * Manages the map layout, player position within the dungeon, and combat state.
 * 
 * @class Dungeon
 * 
 * @property {Array<Room>} map - 2D/flat array of Room objects forming the explorable dungeon layout
 *                               Index corresponds to room ID (map[0] = first room, etc.)
 * @property {boolean} inCombat - Whether the player is currently engaged in active combat
 *                                Used to display combat UI and prevent movement during fights
 * @property {number} currentPosition - Index of the current room the player is in (references map array)
 * 
 * @example
 * const dungeon = new Dungeon();
 * dungeon.map = [room0, room1, room2, room3];  // 4-room dungeon
 * dungeon.currentPosition = 0;                   // Player starts in room 0
 * 
 * // Player movement
 * dungeon.currentPosition = dungeon.map[0].doors[0].exit;  // Move through first door
 * 
 * // Combat
 * dungeon.inCombat = true;   // Combat started
 * dungeon.inCombat = false;  // Combat ended
 */
export default class Dungeon {
    
    constructor() {
        this.map = [];
        this.inCombat = false;
        this.currentPosition = 0;
    }

}