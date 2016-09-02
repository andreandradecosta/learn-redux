var React = require('react')
var connect = require('react-redux').connect
var withRouter = require('react-router').withRouter
var actions = require('../actions')
var TodoList = require('./TodoList')
var FetchError = require('./FetchError')
var reducers = require('../reducers')

var getVisibleTodos = reducers.getVisibleTodos
var getIsFetching  = reducers.getIsFetching
var getErrorMessage  = reducers.getErrorMessage


var VisibleTodoList = React.createClass({
    componentDidMount: function() {
        this.fetchData()
    },
    componentDidUpdate: function(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData()
        }
    },
    fetchData: function() {
        var filter = this.props.filter
        var fetchTodos = this.props.fetchTodos
        fetchTodos(filter)
    },
    render: function() {
        var isFetching = this.props.isFetching
        var todos = this.props.todos
        var toggleTodo = this.props.toggleTodo
        var errorMessage = this.props.errorMessage

        if (isFetching && !todos.length) {
            return <p>Loading...</p>
        }

        if (errorMessage && !todos.length) {
            return <FetchError
                        message={errorMessage}
                        onRetry={this.fetchData}/>
        }

        return <TodoList todos={todos} onTodoClick={toggleTodo}/>
    }
})



var mapStateToTodoListProps = function(state, props) {
    var filter =  props.params.filter || 'all'
    return {
        isFetching: getIsFetching(state, filter),
        errorMessage: getErrorMessage(state, filter),
        todos: getVisibleTodos(state, filter),
        filter
    }
}

// var mapDispatchToTodoListProps = function(dispatch) {
//     return {
//         onTodoClick: function(id) {
//             dispatch(toggeTodo(id))
//         },
//         fetchTodos: function(filter) {
//             dispatch(fetchTodos(filter))
//         }
//     }
// }

VisibleTodoList = withRouter(connect(
    mapStateToTodoListProps,
    actions
    //{onTodoClick: toggeTodo, fetchTodos, }
    // mapDispatchToTodoListProps
)(VisibleTodoList))

module.exports = VisibleTodoList;
