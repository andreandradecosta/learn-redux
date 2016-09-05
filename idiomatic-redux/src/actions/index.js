var api = require('../helpers/api')
var getIsFetching = require('../reducers').getIsFetching
var normalize = require('normalizr').normalize
var schema = require('./schema')

function addTodo(text) {
    return function(dispatch) {
        return api.addTodo(text)
            .then(function(response) {
                dispatch({
                    type: 'ADD_TODO_SUCCESS',
                    response: normalize(response, schema.todo)
                })
            })
    }
}

function toggleTodo(id) {
    return function(dispatch) {
        return api.toggleTodo(id)
            .then(function(response) {
                dispatch({
                    type: 'TOGGLE_TODO_SUCCESS',
                    response: normalize(response, schema.todo)
                })
            })
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
                    response: normalize(response, schema.arrayOfTodos)
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
