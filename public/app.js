$(document).ready(function() {
  $.getJSON("/api/todos")
  .then(addTodos)
  .catch(function(err) {
    throw Error (err);
  });

  $('#todoInput').keypress(function(event) {
    if (event.which == 13) {
      createTodo();
    }
  });

  $('.list').on('click', 'li', function() {
    updateTodo($(this));
  });

  $('.list').on('click', 'span', function(event) {
    event.stopPropagation()
    removeTodo($(this).parent());
  })
});

function addTodos(todos) {
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

function addTodo(todo) {
  var newTodo = $('<li class="task">'+todo.name +'<span>x</span></li>');
  //keeping track of todo mongo id
  newTodo.data('id', todo._id);
  //keeping track of todo 'completed' status
  newTodo.data('completed', todo.completed);
  if (todo.completed) {
    newTodo.addClass("done");
  }
  $('.list').append(newTodo);
}

function createTodo() {
  //sending request to create new todo
  var usrInput = $('#todoInput').val();
  $.post('/api/todos', {name: usrInput})
  .then(function(newTodo) {
    //clearing out the input field
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch(function(err) {
    console.log(err);
  })
}

function removeTodo(todo) {
  var clickedId = todo.data('id');
  var deleteUrl = '/api/todos/' + clickedId;
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data) {
    todo.remove();
  })
  .catch(function(err) {
    console.log(err.message);
  })
}

function updateTodo(todo) {
  var clickedId = todo.data('id');
  var updateUrl = '/api/todos/' + clickedId;
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone};

  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTodo) {
    todo.toggleClass('done');
    todo.data('completed', isDone);
  })
  .catch(function(err) {
    throw Error (err.message);
  });
}