var React = require('react')
var Provider = require('react-redux').Provider
var TodoApp = require('./TodoApp')
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var browserHistory = ReactRouter.browserHistory

function Main(props) {
    return (
        <Provider store={props.store}>
            <Router history={browserHistory}>
                <Route path='/(:filter)' component={TodoApp} />
            </Router>
        </Provider>
    )
}

module.exports = Main;
