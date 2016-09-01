var React = require('react')
var Link = require('react-router').Link

var style={
    activeStyle: {
          textDecoration: 'none',
          color: 'black'
      }
  }

function FilterLink(props) {
    var filter = props.filter
    return (
        <Link
          to={filter === 'all' ? '': filter}
          activeStyle={style.activeStyle}
        >
            {props.children}
        </Link>
    )

}

module.exports = FilterLink;
