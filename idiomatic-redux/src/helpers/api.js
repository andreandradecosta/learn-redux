var uuid = require('node-uuid')

var fakeDatabase = {
    todos: [
        {
            id: uuid.v4(),
            text: 'todo 1',
            completed: true
        },
        {
            id: uuid.v4(),
            text: 'todo 2',
            completed: false
        },
        {
            id: uuid.v4(),
            text: 'todo 3',
            completed: false
        },
    ]
}


function delay(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms)
    })
}

var api = {
    fetchTodos: function(filter) {
        return delay(2000).then(function() {

            if (Math.random() > 0.5) {
                throw new Error('Boom!')
            }

            switch (filter) {
                case 'all':
                return fakeDatabase.todos
                case 'active':
                return fakeDatabase.todos.filter(function(t) { return !t.completed})
                case 'completed':
                return fakeDatabase.todos.filter(function(t) { return t.completed})
                default:
                throw new Error(`Unknown filter: ${filter}`)
            }
        })
    }
}


module.exports = api;
