function byId(state, action) {
    if (typeof state === 'undefined') {
        state = {}
    }
    if (action.response) {
        return {
            ...state,
            ...action.response.entities.todos
        }
    }
    return state
}

function getTodo(state, id) {
    return state[id]
}

module.exports = {byId, getTodo}
