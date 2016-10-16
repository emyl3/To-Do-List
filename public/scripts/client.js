$(function () {
  getTasks();
  $('.row.taskAddition').on('click', '#addTask', displayForm);
  $('.row.taskAddition').on('click', '#submit', addTask);
  $('#taskList').on('click', '.delete', deleteTask);
});

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: displayTasks,
  });
}

function displayTasks(response) {
  var $taskList = $('#taskList');
  $taskList.empty();

  response.forEach(function (task) {
    var $divRowOne = $('<div class="row task"></div>');
    var $divCol = $('<div class="col-xs-6 task"></div>');
    var $divRowTwo = $('<div class="row task2"></div>');
    var $checkbox = $('<div class="col-xs-2 task"><input type="checkbox" checked="' + task.complete + '" class="' + task.complete + '" name="complete"/></div>');
    var $task = $('<div class="col-xs-8 task"><span>' + task.task_name + '</span></div>');
    var $remove = $('<div class="col-xs-2 task"><button class="delete" data="' + task.id + '">X</button></div>');
    $divRowTwo.append($checkbox);
    $divRowTwo.append($task);
    $divRowTwo.append($remove);
    $divCol.append($divRowTwo);
    $divRowOne.append($divCol);
    $taskList.append($divRowOne);
  });
}

function displayForm() {
  var $taskAdd =  $('.row.taskAddition');
  $taskAdd.empty();
  var $task = $('<div class="col-xs-10 task"><input id="task_name" name="task_name" type="text" placeholder="enter a task here..."><form></div>');
  var $accept = $('<div class="col-xs-2 task"><button id="submit">O</button></div>');
  $taskAdd.append($task);
  $taskAdd.append($accept);
}

function addTask(event) {
  var task = $('#task_name').val();
  var taskData = 'task_name=' + task + '&complete=' + false;

  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskData,
    success: displayPrompt,
  });
}

function displayPrompt() {
  var $taskAdd =  $('.row.taskAddition');
  $taskAdd.empty();
  var $prompt = $('<div class="col-xs-12"><button id="addTask">+ add a task</button></div>');
  $taskAdd.append($prompt);
  getTasks();
}

function deleteTask() {
  
}
