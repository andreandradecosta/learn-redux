var combineReducers = require('redux').combineReducers
var fromById = require('./byId')
var fromList = require('./createList')
var byId = fromById.byId
var createList = fromList.createList



var listByFilter = combineReducers({
    all: createList('all'),
    active: createList('active'),
    completed: createList('completed')
})

var todos = combineReducers({
    byId,
    listByFilter
})


//Selectors
function getVisibleTodos(state, filter) {
    var ids = fromList.getIds(state.listByFilter[filter])
    return ids.map(function(id) {
        return fromById.getTodo(state.byId, id)
    })
}

function getIsFetching(state, filter) {
    return fromList.getIsFetching(state.listByFilter[filter])
}

function getErrorMessage(state, filter) {
    return fromList.getErrorMessage(state.listByFilter[filter])
}

module.exports = {todos, getVisibleTodos, getIsFetching, getErrorMessage}
