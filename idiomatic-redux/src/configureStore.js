var createStore = require('redux').createStore
var applyMiddleware = require('redux').applyMiddleware
var createLogger = require('redux-logger')
var thunk = require('redux-thunk').default
var reducer = require('./reducers').todos

// function thunk(store) {
//     return function(next) {
//         return function(action) {
//             if (typeof action === 'function') {
//                 action(store.dispatch, store.getState)
//             } else {
//                 next(action)
//             }
//         }
//     }
// }


function configureStore() {
    var middlewares = [thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger())
    }
    return createStore(
        reducer,
        applyMiddleware(...middlewares)
    )
}


module.exports = configureStore;
