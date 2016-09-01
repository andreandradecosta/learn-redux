var combineReducers = require('redux').combineReducers
var todo = require('./todo')

function byId(state, action) {
    if (typeof state === 'undefined') {
        state = {}
    }
    switch (action.type) {
        case 'ADD_TODO':
        case 'TOGGLE_TODO':
            return {
                ...state,
                [action.id]: todo(state[action.id], action)
            }
        default:
            return state
    }
}

function allIds(state, action) {
    if (typeof state === 'undefined') {
        state = []
    }
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.id]
        default:
            return state
    }
}

var todos = combineReducers({
    byId,
    allIds
})

function getAllTodos(state) {
    return state.allIds.map(function(id) {
        return state.byId[id]
    })
}

function getVisibleTodos(state, filter) {
    var allTodos = getAllTodos(state)
    switch (filter) {
        case 'all':
            return allTodos
        case 'completed':
            return allTodos.filter(function(item) {
                return item.completed
            })
        case 'active':
            return allTodos.filter(function(item) {
                return !item.completed
            })
        default:
            throw new Error(`Unknown filter: ${filter}.`)
    }
}


module.exports = {todos, getVisibleTodos}
