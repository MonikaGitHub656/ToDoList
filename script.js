$(document).ready(function () {
  // function to get tasks
  var getTasks = function (){
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=280',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#list').empty();
        response.tasks.forEach(function (task) {
          $('#list').append('<div class="row"><p class="col-xs-6 text-left" style="text-decoration:' + (task.completed ? 'line-through' : 'none') + '">' + task.content + '</p><button class="delete" data-id="' + task.id + '">delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div>');
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  // function to add tasks
  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=280',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#content').val(),
        }
      }),
      success: function (response, textStatus) {
        console.log(response);
        getTasks();
        $('#content').val("");
      },
      error: function (response, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    })
  }

  // event listener to add tasks
  $('#createToDo').on('submit', function (e) {
    e.preventDefault();
    createTask();
  })

  // function to delete tasks
  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=280',
      success: function (response, textStatus) {
        console.log(response);
        getTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }

    })
  };

  // event listener to delete tasks
  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  });

  // function to mark tasks complete
  var markTaskComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=280',
      dataType: 'json',
      success: function (response, textStatus) {
        getTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  // event listener to mark tasks as complete or active
  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });

  // function to mark tasks as active
  var markTaskActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=280',
      dataType: 'json',
      success: function (response, textStatus) {
        getTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessages);
      }
    })
  };

  // run getTasks function
  getTasks();

});






