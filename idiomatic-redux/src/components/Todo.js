var React = require('react')

function Todo(props) {
    return <li onClick={props.onClick}
                style={{textDecoration: props.completed ?
                        'line-through':
                        'none'}}>
                    {props.text}
            </li>
}

module.exports = Todo;
