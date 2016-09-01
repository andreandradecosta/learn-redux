var connect = require('react-redux').connect
var React = require('react')
var addTodo = require('../actions').addTodo

var AddTodo = function (props) {
    var input
    return (
        <div>
            <input ref={(inputElement) => { input = inputElement }}/>
            <button onClick={function() {
                                props.dispatch(addTodo(input.value))
                                input.value = ''
                            }}>
                Add
            </button>
        </div>
    )
}

AddTodo = connect()(AddTodo)

module.exports = AddTodo;
