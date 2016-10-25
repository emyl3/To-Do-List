var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var tasks = require('./routes/tasks.js');

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/tasks', tasks);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
  //res.sendFile(path.resolve('public/index.html')); another way to do above
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});
