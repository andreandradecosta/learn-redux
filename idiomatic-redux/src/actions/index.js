var uuid = require('node-uuid')
var api = require('../helpers/api')
var getIsFetching = require('../reducers').getIsFetching


function addTodo(text) {
    return {
        type: 'ADD_TODO',
        id: uuid.v4(),
        text: text
    }
}
function toggleTodo(id) {
    return {
        type: 'TOGGLE_TODO',
        id: id
    }
}


function fetchTodos(filter) {
    return function(dispatch, getState) {
        if (getIsFetching(getState(), filter)) {
            return Promise.resolve()
        }
        dispatch({
            type: 'FETCH_TODOS_REQUEST',
            filter: filter
        })
        
        return api.fetchTodos(filter).then(
            function(response) {
                return dispatch({
                    type: 'FETCH_TODOS_SUCCESS',
                    filter: filter,
                    response: response
                })
            },
            function(error) {
                return dispatch({
                    type: 'FETCH_TODOS_FAILURE',
                    filter: filter,
                    message: error.message || 'Something went wrong.'
                })
            }
        )
    }
}

module.exports = {addTodo, toggleTodo, fetchTodos};
