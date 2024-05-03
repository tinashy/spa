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
});

function addTodos(todos) {
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

function addTodo(todo) {
  var newTodo = $('<li class="task">'+todo.name +'<span>x</span></li>');
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