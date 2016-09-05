var Schema = require('normalizr').Schema
var arrayOf = require('normalizr').arrayOf


var todo = new Schema('todos')
var arrayOfTodos = arrayOf(todo)

module.exports = {todo, arrayOfTodos};
