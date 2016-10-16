$(function () {
  getTasks();
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
