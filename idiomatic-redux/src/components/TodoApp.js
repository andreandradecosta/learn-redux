var React = require('react')
var AddTodo = require('./AddTodo')
var VisibleTodoList = require('./VisibleTodoList')
var Footer = require('./Footer')

function TodoApp(props) {
    return (
        <div>
            <AddTodo />
            <VisibleTodoList/>
            <Footer />
        </div>
    )
}

module.exports = TodoApp;
