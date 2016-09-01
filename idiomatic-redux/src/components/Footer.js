var React = require('react')
var FilterLink = require('./FilterLink')

function Footer() {
    return (
        <p>
            Show:
            {' '}
            <FilterLink filter={'all'}>All</FilterLink>
            {', '}
            <FilterLink filter={'active'}>Active</FilterLink>
            {', '}
            <FilterLink filter={'completed'}>Completed</FilterLink>
        </p>
    )
}

module.exports = Footer;
