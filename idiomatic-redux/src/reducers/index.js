var Redux = require('redux')
var todos = require('./todos').todos
var selectTodos = require('./todos').getVisibleTodos

var todoApp = Redux.combineReducers({
    todos
})

var getVisibleTodos = function (state, filter) {
    return selectTodos(state.todos, filter)
}

module.exports = {todoApp, getVisibleTodos};
