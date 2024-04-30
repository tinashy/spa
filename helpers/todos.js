var db = require('../models');

exports.getTodos = function(req, res) {
  db.Todo.find()
  .then(function(todos) {
    res.json(todos);
  })
  .catch(function(err) {
    res.send(err);
  })
};

exports.createTodos = function(req, res) {
  db.Todo.create(req.body)
  .then(function(newTodo) {
    //status code 201 shows 'created' if db item creation is successful
    //you can chain it together with the json response and it will show up in the headers
    res.status(201).json(newTodo);
  })
  .catch(function(err) {
    res.send(err.message);
  })
}

exports.getTodo = function(req, res) {
  db.Todo.findById(req.params.todoId)
  .then(function(foundTodo) {
    res.json(foundTodo);
  })
  .catch(function(err) {
    res.send(err.message);
  })
}

exports.updateTodo = function(req, res) {
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
  .then(function(todo) {
    res.json(todo);
  })
  .catch(function(err) {
    res.send(err.message);
  })
}

exports.deleteTodo = function(req, res) {
  db.Todo.findByIdAndDelete({_id: req.params.todoId})
  .then(function(todo) {
    res.json({message: "We deleted i!"});
  })
  .catch(function(err) {
    res.send(err.message);
  })
}

module.exports = exports;