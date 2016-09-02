function byId(state, action) {
    if (typeof state === 'undefined') {
        state = {}
    }
    switch (action.type) {
        case 'FETCH_TODOS_SUCCESS':
            var nextState = {...state}
            action.response.forEach(function(todo) {
                nextState[todo.id] = todo
            })
            return nextState
        default:
            return state
    }
}

function getTodo(state, id) {
    return state[id]
}

module.exports = {byId, getTodo}
