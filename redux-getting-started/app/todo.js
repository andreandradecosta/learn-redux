var expect = require('expect')
var deepFreeze = require('deep-freeze')
var Redux = require('redux')
var React = require('react')
var ReactDOM = require('react-dom')
var ReactRedux = require('react-redux')

//Reducers
function todo(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
        return {
            id: action.id,
            text: action.text,
            completed: false
        }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state
            }
            return Object.assign({}, state, {
                completed: !state.completed
            })
        default:
          return state
    }
}

function todos(state, action) {
    if (typeof state === 'undefined') {
        state = []
    }
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat(todo(undefined, action))
        case 'TOGGLE_TODO':
            return state.map(function(item) {
                return todo(item, action)
            })
        default:
            return state
    }
}

function visibilityFilter(state, action) {
    if (typeof state === 'undefined') {
        state = 'SHOW_ALL'
    }
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

var todoApp = Redux.combineReducers({
    todos,
    visibilityFilter
})


//Action Creators
var nextTodoId = 0
function addTodo(text) {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text: text
    }
}
function toggeTodo(id) {
    return {
        type: 'TOGGLE_TODO',
        id: id
    }
}
function setVisibilityFilter(filter) {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
    }
}


//Tests
function testAddTodo() {
    var stateBefore = []
    var action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    }
    var stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ]
    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter)
}


function testToggleTodo() {
    var stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: false
        }
    ]
    var action = {
        type: 'TOGGLE_TODO',
        id: 1
    }
    var stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: true
        }
    ]
    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter)
}

testAddTodo()
testToggleTodo()
console.log('Tests passed');



//Compoments

function TodoApp() {
    return (
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    )
}

function AddTodo(props) {
    var input
    return (
        <div>
            <input ref={(inputElement) => input = inputElement}/>
            <button onClick={function() {
                                props.dispatch(addTodo(input.value))
                                input.value = ''
                            }}>
                Add
            </button>
        </div>
    )
}

AddTodo = ReactRedux.connect()(AddTodo)

var mapStateToTodoListProps = function(state) {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

function getVisibleTodos(todos, filter) {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(function(item) {
                return item.completed
            })
        case 'SHOW_ACTIVE':
            return todos.filter(function(item) {
                return !item.completed
            })
    }
}


var mapDispatchToTodoListProps = function(dispatch) {
    return {
        onTodoClick: function(id) {
            dispatch(toggeTodo(id))
        }
    }
}

var VisibleTodoList = ReactRedux.connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList)



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


function Todo(props) {
    return <li onClick={props.onClick}
                style={{textDecoration: props.completed ?
                        'line-through':
                        'none'}}>
                    {props.text}
            </li>
}

function Footer() {
    return (
        <p>
            Show:
            {' '}
            <FilterLink filter={'SHOW_ALL'}>All</FilterLink>
            {' '}
            <FilterLink filter={'SHOW_ACTIVE'}>Active</FilterLink>
            {' '}
            <FilterLink filter={'SHOW_COMPLETED'}>Completed</FilterLink>
        </p>
    )
}

var mapStateToLinkProps = function(state, ownProps) {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}

var mapDispatchToLinkProps = function(dispatch, ownProps) {
    return {
        onClick: function() {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

var FilterLink = ReactRedux.connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link)

function Link(props) {
    if (props.active) {
        return <span>{props.children}</span>
    }
    return <a href='#' onClick={function(e) {
                                    e.preventDefault()
                                    props.onClick()
                                }}>
                {props.children}
            </a>
}

var Provider = ReactRedux.Provider

var store = Redux.createStore(todoApp)

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('app')
)


//Demo
// store.subscribe(function() {
//     console.log(store.getState());
// })
//
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 0,
//     text: 'item 0'
// })
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 1,
//     text: 'item 1'
// })
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 2,
//     text: 'item 2'
// })
// nextTodoId = 3
// store.dispatch({
//     type: 'TOGGLE_TODO',
//     id: 1
// })
//
// store.dispatch({
//     type: 'SET_VISIBILITY_FILTER',
//     filter: 'SHOW_COMPLETED'
// })
