export const UPDATE_PLAYER = 'player:updatePlayer';

export function updatePlayer(newPlayer) {
    return {
        type: UPDATE_PLAYER,
        payload: {
            user: newPlayer
        }
    }
}