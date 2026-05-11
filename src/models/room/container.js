/**
 * A storage object in a room (chest, crate, cabinet, etc.) that holds items.
 * Containers can be locked and hidden, requiring investigation to discover and skill to open.
 * 
 * @class Container
 * 
 * @property {Array<Item>} items - Array of Item objects currently stored in the container
 * @property {boolean} locked - Whether the container is currently locked/sealed
 * @property {boolean} hidden - Whether the container is concealed (requires Perception to find)
 * @property {boolean} open - Whether the container has been opened by the player
 * @property {number} lock - Lock difficulty (0 = no lock, 15+ = very difficult)
 * @property {number} hide - Concealment difficulty for spotting the hidden container (0 = visible)
 * @property {string} name - Display name (e.g., 'Wooden Chest', 'Stone Crate', 'Ornate Coffer')
 * 
 * @example
 * const treasureChest = new Container();
 * treasureChest.name = 'Wooden Treasure Chest';
 * treasureChest.locked = true;
 * treasureChest.lock = 12;                    // DC 12 to pick the lock
 * treasureChest.items = [goldCoin, sword];   // Contains valuable items
 * 
 * const hiddenStash = new Container();
 * hiddenStash.name = 'Loose Stone';
 * hiddenStash.hidden = true;
 * hiddenStash.hide = 16;                     // DC 16 Perception check to find
 */
export default class Container {

    constructor(){
        this.items = [];
        this.locked = false;
        this.hidden = false;
        this.open = false;
        this.lock = 0;
        this.hide = 0;
        this.name = "";
    }
    
}