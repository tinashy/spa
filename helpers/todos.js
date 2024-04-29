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

module.exports = exports;