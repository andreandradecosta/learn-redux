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
        return delay(1000).then(function() {

            // if (Math.random() > 0.5) {
            //     throw new Error('Boom!')
            // }

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
    },

    addTodo: function(text) {
        return delay(500).then(function() {
            var todo = {
                id: uuid.v4(),
                text: text,
                completed: false
            }
            fakeDatabase.todos.push(todo)
            return todo
        })
    },

    toggleTodo: function(id) {
        return delay(500).then(function() {
            var todo = fakeDatabase.todos.find(function(t) { return t.id === id })
            todo.completed = ! todo.completed
            return todo
        })
    }
}



module.exports = api;
