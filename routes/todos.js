var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    helpers = require('../helpers/todos');

router.route('/')
  .get(helpers.getTodos)
  .post(helpers.createTodos);

module.exports = router;