var React = require('react')
var ReactDOM = require('react-dom')
var Redux = require('redux')
var expect = require('expect')

function counter(state, action) {
    if (typeof state === 'undefined') {
        return 0
    }
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}
var store = Redux.createStore(counter)


function Counter(props) {
    return (
        <div>
            <h1>{props.value}</h1>
            <button onClick={props.onIncrement}>+</button>
            <button onClick={props.onDecrement}>-</button>
        </div>
    )
}

function render () {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={function() {
                store.dispatch({type: 'INCREMENT'})
            }}
            onDecrement={function() {
                store.dispatch({type: 'DECREMENT'})
            }}/>,
        document.getElementById('app')
    )
}

store.subscribe(render)
render()


//tests
expect(
    counter(0, {type: 'INCREMENT'})
).toEqual(1)

expect(
    counter(1, {type: 'DECREMENT'})
).toEqual(0)

expect(
    counter(1, {type: ''})
).toEqual(1)

expect(
    counter(undefined, {})
).toEqual(0)

console.log('Tests passed');
