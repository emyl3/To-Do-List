var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rho',
};

var pool = new pg.Pool(config);

router.get('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to the database', err);
        res.sendStatus(500);
        return;
      }

      client.query('SELECT * FROM tasks',
        function (err, result) {
          if (err) {
            console.log('Error querying the database', err);
            res.sendStatus(500);
            return;
          }

          console.log('Got rows from the DB: ', result.rows);
          res.send(result.rows);
        });

    } finally {
      done();
    }
  });
});

router.post('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to the database', err);
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO tasks (task_name, complete) VALUES($1, $2) returning *;',
                  [req.body.task_name, req.body.complete],
                  function (err, result) {
                    if (err) {
                      console.log('Error querying the database', err);
                      res.sendStatus(500);
                      return;
                    }

                    console.log('Got rows from the DB: ', result.rows);
                    res.send(result.rows);
                  });
    } finally {
      done();
    }
  });
});

module.exports = router;
