export const UPDATE_DUNGEON = 'dungeon:updateDungeon';

export function updateDungeon(newDungeon) {
    return {
        type: UPDATE_DUNGEON,
        payload: newDungeon
    }
}