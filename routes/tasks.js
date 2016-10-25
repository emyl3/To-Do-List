var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rho',
};

var pool = new pg.Pool(config);

//similar to config and pool set up above
// var connectionString = 'postgres://localhost:5432/filefolderhere'

router.get('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to the database', err);
        res.sendStatus(500);
        return;
      }

      client.query('SELECT * FROM tasks ORDER BY complete ASC, id DESC;',
        function (err, result) {
          if (err) {
            console.log('Error querying the database', err);
            res.sendStatus(500);
            return;
          }

          console.log('Got rows from the database: ', result.rows);
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

                    console.log('Got rows from the database: ', result.rows);
                    res.send(result.rows);
                  });
    } finally {
      done();
    }
  });
});

router.delete('/:id', function (req, res) {
  var id = parseInt(req.params.id);

  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database', err);
        res.sendStatus(500);
        return;
      }

      client.query('DELETE FROM tasks WHERE id=$1;', [id], function (err) {
        if (err) {
          console.log('Error querying the database', err);
          res.sendStatus(500);
          return;
        }

        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});

router.put('/complete/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var complete = req.body.complete;

  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting the DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('UPDATE tasks SET complete=$1 WHERE id=$2 RETURNING *;',
      [complete, id],
      function (err, result) {
        if (err) {
          console.log('Error querying database', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    } finally {
      done();
    }
  });
});

module.exports = router;
