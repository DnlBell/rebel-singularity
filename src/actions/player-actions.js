export const UPDATE_PLAYER = 'playerCharacter:updatePlayer';

export function updatePlayer(newPlayer) {
    return {
        type: UPDATE_PLAYER,
        payload: {
            player: newPlayer
        }
    }
}