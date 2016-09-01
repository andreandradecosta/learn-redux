var uuid = require('node-uuid')
var api = require('../helpers/api')


function receiveTodos(filter, response) {
    return {
        type: 'RECEIVE_TODOS',
        filter: filter,
        response: response
    }
}

function fetchTodos(filter) {
    return api.fetchTodos(filter).then(function(response) {
        return receiveTodos(filter, response)
    })
}

function addTodo(text) {
    return {
        type: 'ADD_TODO',
        id: uuid.v4(),
        text: text
    }
}
function toggeTodo(id) {
    return {
        type: 'TOGGLE_TODO',
        id: id
    }
}

module.exports = {addTodo, toggeTodo, fetchTodos};
