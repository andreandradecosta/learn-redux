var React = require('react')
var Todo = require('./Todo')

function TodoList(props) {
    return (
        <ul>
            {props.todos.map(function(todo) {
                return <Todo
                          key={todo.id}
                          onClick={props.onTodoClick.bind(null, todo.id)}
                          completed={todo.completed}
                          text={todo.text} />
            })}
        </ul>
    )
}

module.exports = TodoList;
