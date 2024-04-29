var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

module.exports.Todo = require('./todo');