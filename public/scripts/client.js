$(function () {
  getTasks();
  $('.row.taskAddition').on('click', '#addTask', displayForm);
  $('.row.taskAddition').on('click', '#submit', addTask);
  $('#taskList').on('click', '.delete', deletePrompt);
  $('#taskList').on('click', '.status', updateStatus);
});

var deleteItemId;

//ajax request to retrieve tasks in DB
function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: displayTasks,
  });
}

//appends the tasks to the DOM
function displayTasks(response) {
  var $taskList = $('#taskList');
  $taskList.empty();

  response.forEach(function (task) {
    var status;
    if (task.complete === true) {
      status = ' checked = "checked"';
    } else if (task.complete === false) {
      status = ' ';
    }

    var $divRowOne = $('<div class="row task"></div>');
    var $divCol = $('<div class="col-xs-12 task"></div>');
    var $divRowTwo = $('<div class="row task2"></div>');
    var $checkbox = $('<div class="col-xs-2 task"><input type="checkbox"' + status + '" class="status" data-id="' + task.id + '" data-status="' + task.complete + '" name="complete"/></div>');
    var $task = $('<div class="col-xs-8 task"><span class="' + task.complete + '">' + task.task_name + '</span></div>');
    var $remove = $('<div class="col-xs-2 button"><button class="delete" data-id="' + task.id + '">X</button></div>');
    $divRowTwo.append($checkbox);
    $divRowTwo.append($task);
    $divRowTwo.append($remove);
    $divCol.append($divRowTwo);
    $divRowOne.append($divCol);
    $taskList.append($divRowOne);
  });
}

//displays the add task input field
function displayForm() {
  var $taskAdd =  $('.row.taskAddition');
  $taskAdd.empty();
  var $task = $('<div class="col-xs-9"><input id="task_name" name="task_name" type="text" placeholder="enter new task here..."><form></div>');
  var $accept = $('<div class="col-xs-3"><button id="submit">add</button></div>');
  $taskAdd.append($task);
  $taskAdd.append($accept);
}

//posts the task to the database
function addTask() {
  var task = $('#task_name').val();
  var taskData = 'task_name=' + task + '&complete=' + false;

  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskData,
    success: displayPrompt,
  });
}

//displays the add task button
function displayPrompt() {
  var $taskAdd =  $('.row.taskAddition');
  $taskAdd.empty();
  var $prompt = $('<div class="col-xs-12"><button id="addTask">add task</button></div>');
  $taskAdd.append($prompt);
  getTasks();
}

//delete task request to the DB
function deleteTask() {
  $.ajax({
    type: 'DELETE',
    url: '/tasks/' + deleteItemId,
    success: getTasks,
  });
}

//toggles between complete and incomplete task status
function updateStatus() {
  var id = $(this).data('id');
  var status = $(this).data('status');
  if (status === true) {
    status = false;
  } else if (status === false) {
    status = true;
  }

  var statusData = 'complete=' + status;

  $.ajax({
    type: 'PUT',
    url: '/tasks/complete/' + id,
    data: statusData,
    success: getTasks,
  });
}

//deletes the prompt
function deletePrompt() {
  deleteItemId = $(this).data('id');

  var result = confirm('Are you sure you want to delete this task?');
  if (result === true) {
    deleteTask();
  }
}
