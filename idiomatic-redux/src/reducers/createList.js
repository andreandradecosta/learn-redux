var combineReducers = require('redux').combineReducers

function createList(filter) {
    var handleToggle = function(state, action) {
        var toggledId = action.response.result
        var entities = action.response.entities
        var completed = entities.todos[toggledId].completed
        var shouldRemove = (
            (completed && filter === 'active') ||
            (!completed && filter === 'completed')
        )
        return shouldRemove ?
            state.filter(function(id) { return id !== toggledId }):
            state
    }

    var ids = function(state, action) {
        if (typeof state === 'undefined') {
            state = []
        }
        switch (action.type) {
            case 'FETCH_TODOS_SUCCESS':
                return action.filter === filter ?
                    action.response.result :
                    state
            case 'ADD_TODO_SUCCESS':
                return filter !== 'completed' ?
                    [...state, action.response.result] :
                    state
            case 'TOGGLE_TODO_SUCCESS':
                return handleToggle(state, action)
            default:
                return state
        }

    }

    var isFetching = function(state, action) {
        if (typeof state === 'undefined') {
            state = false
        }
        if (action.filter !== filter) {
            return state
        }
        switch (action.type) {
            case 'FETCH_TODOS_REQUEST':
                return true
            case 'FETCH_TODOS_SUCCESS':
            case 'FETCH_TODOS_FAILURE':
                return false
            default:
                return state
        }
    }

    var errorMessage = function(state, action) {
        if (typeof state === 'undefined') {
            state = null
        }
        if (action.filter !== filter) {
            return state
        }
        switch (action.type) {
            case 'FETCH_TODOS_FAILURE':
                return action.message
            case 'FETCH_TODOS_REQUEST':
            case 'FETCH_TODOS_SUCCESS':
                return null
            default:
                return state
        }
    }


    return combineReducers({
        ids,
        isFetching,
        errorMessage
    })

}


//Selectors
function getIds(state) {
    return state.ids
}

function getIsFetching(state) {
    return state.isFetching
}

function getErrorMessage(state) {
    return state.errorMessage
}


module.exports = { createList, getIds, getIsFetching, getErrorMessage }
