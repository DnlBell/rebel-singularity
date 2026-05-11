/**
 * A single tile/location in the dungeon map.
 * Rooms contain encounter elements (NPCs/enemies), collectible items in containers,
 * doors connecting to adjacent rooms, and descriptive text.
 * 
 * @class Room
 * 
 * @property {Array<Door>} doors - Emergency exits/passages to other rooms (min 1, typically 2-4)
 * @property {Array<Character>} characters - NPCs and enemies present in this room
 * @property {Array<Container>} containers - Chests, crates, and other storage in the room
 * @property {string} generalDescription - Flavor text describing the room's appearance and atmosphere
 * 
 * @example
 * const room = new Room();
 * // Room might contain:
 * // - 2 doors leading north and south
 * // - 1 goblin enemy
 * // - 1 locked chest with treasure
 * // - Description: "A damp stone chamber with faint torch light"
 */
export default class Room {

    constructor(){
        this.doors = [];
        this.characters = [];
        this.containers = [];
        this.generalDescription = "...";
    }

}