var combineReducers = require('redux').combineReducers

function createList(filter) {
    var ids = function(state, action) {
        if (typeof state === 'undefined') {
            state = []
        }
        if (action.filter !== filter) {
            return state
        }
        switch (action.type) {
            case 'FETCH_TODOS_SUCCESS':
                return action.response.map(function(todo) { return todo.id })
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
