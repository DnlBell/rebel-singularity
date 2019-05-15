export const UPDATE_LOG = 'log:updateLog';

export function updateLog(newAction) {
    return {
        type: UPDATE_LOG,
        payload: newAction
    }
}