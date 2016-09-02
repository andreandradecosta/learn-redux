var React = require('react')


function FetchError(props) {
    return (
        <div>
            <p>Could not fetch todos. {props.message} </p>
            <button onClick={props.onRetry}>Retry</button>
        </div>
    )
}

module.exports = FetchError;
