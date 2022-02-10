const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/load-game', rejectUnauthenticated, (req, res) => {
  pool.query(`
  SELECT "game_state" from "user"
  WHERE id=$1
  `, [req.user.id]).then(dbRes => {
    console.log(dbRes);
    res.send(dbRes.rows)
  }).catch(err => {
    console.error('loadgame failed', err);
  })
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});
//update username
router.put('/update/', rejectUnauthenticated, (req, res) => {{
  pool.query(`
  UPDATE "user"
  SET username=$1
  WHERE id=$2
  `, [req.body.newName, req.user.id]).then(dbres => {
    res.sendStatus(200)
  }).catch(err => {
    console.error('UPDATE FAILED', err);
  })
}})

//autosave router
router.put('/update/autosave', rejectUnauthenticated, (req, res) => {{
  pool.query(`
  UPDATE "user"
  SET game_state=$1
  WHERE id=$2
  `, [req.body.data, req.user.id]).then(dbres => {
    res.sendStatus(200)
  }).catch(err => {
    console.error('UPDATE FAILED', err);
  })
}})
//delete user
router.delete('/delete/', rejectUnauthenticated, (req, res) => {
  pool.query(`
  DELETE from "user"
  WHERE id=$1
  `, [req.user.id]).then(dbRes => {
    res.sendStatus(201)
  }).catch(err => {
    console.error('DELETE failed', err);
  })
})

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
