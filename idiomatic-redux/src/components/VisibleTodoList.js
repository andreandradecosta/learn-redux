var React = require('react')
var connect = require('react-redux').connect
var withRouter = require('react-router').withRouter
var toggeTodo = require('../actions').toggeTodo
var fetchTodos = require('../actions').fetchTodos
var TodoList = require('./TodoList')
var getVisibleTodos = require('../reducers').getVisibleTodos

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
        return <TodoList {...this.props} />
    }
})

var mapStateToTodoListProps = function(state, props) {
    var filter =  props.params.filter || 'all'
    return {
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
    {onTodoClick: toggeTodo, fetchTodos}
    // mapDispatchToTodoListProps
)(VisibleTodoList))

module.exports = VisibleTodoList;
