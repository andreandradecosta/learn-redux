var createStore = require('redux').createStore
var reducer = require('./reducers').todoApp


function addLoggingToDispatch(store) {
    var rawDispatch = store.dispatch
    if (!console.group) {
        return rawDispatch
    }
    return function(action) {
        console.group(action.type)
        console.log('%c prev state', 'color: gray', store.getState())
        console.log('%c action', 'color: blue', action)
        var returnValue = rawDispatch(action)
        console.log('%c next state', 'color: green', store.getState())
        console.groupEnd(action.type)
        return returnValue
    }
}

function addPromiseSupportToDispatch(store) {
    var rawDispatch = store.dispatch
    return function(action) {
        if (typeof action.then === 'function') {
            return action.then(rawDispatch)
        }
        return rawDispatch(action)
    }
}


function configureStore() {
    var store = createStore(reducer)

    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store)
    }
    store.dispatch = addPromiseSupportToDispatch(store)

    return store
}


module.exports = configureStore;
