/**
 * A passage/doorway connecting two rooms in the dungeon.
 * Doors can be locked, hidden, or physically damaged.
 * 
 * @class Door
 * 
 * @property {number} exit - Identifier of the destination room this door leads to
 * @property {boolean} locked - Whether the door is currently locked/sealed
 * @property {boolean} hidden - Whether the door is concealed from casual observation
 * @property {number} lock - Difficulty rating for picking the lock (0 = no lock, higher = harder)
 * @property {number} hide - DC difficulty for spotting the hidden door (0 = visible)
 * @property {string} name - Descriptive name (e.g., 'Wooden Door', 'Iron Gate', 'Archway')
 * @property {number} hp - Hit points before door breaks (1 = easily destroyed, 10+ = reinforced/magical)
 * 
 * @example
 * const ironDoor = new Door();
 * ironDoor.exit = 5;           // Leads to room 5
 * ironDoor.locked = true;      // Currently locked
 * ironDoor.lock = 15;          // Difficult lock (15 DC)
 * ironDoor.name = 'Iron Gate';
 * ironDoor.hp = 10;            // Tough door
 */
export default class Door {

    constructor(){
        this.exit = 0;
        this.locked = false;
        this.hidden = false;
        this.lock = 0;
        this.hide = 0;
        this.name = "";
        this.hp = 1;
    }

}