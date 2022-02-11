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
//grabs name and id of Characters
router.get('/', (req, res) => {
    console.log(req.query.char);
    pool.query(`
        SELECT "characters"."id", "characters"."name" from "user"
        JOIN "characters"
            ON "user"."id" = "characters"."user_id"
        WHERE "user_id"=$1;
    `, [req.user.id]).then(dbRes => {
        console.log('************DBRes',dbRes.rows[0]);
        res.send(dbRes.rows[0])
    }).catch(err => {
        console.error('loadgame failed', err);
    })
});
//retrives game state
router.get('/load-game', (req, res) => {
    console.log(req.query.char);
    pool.query(`
        SELECT "game_state" from "user"
        JOIN "characters"
            ON "user"."id" = "characters"."user_id"
        WHERE "user_id"=$1;
    `, [req.user.id]).then(dbRes => {
        console.log('************DBRes',dbRes.rows[0]);
        res.send(dbRes.rows[0])
    }).catch(err => {
        console.error('loadgame failed', err);
    });
});

//autosave router
router.put('/update/autosave', rejectUnauthenticated, (req, res) => {
    pool.query(`
        UPDATE "characters"
        SET game_state=$1
        WHERE user_id=$2
    `, [req.body.data, req.user.id]).then(dbres => {
        console.log('*****************AUTOSAVE', req.body);
        res.sendStatus(200)
    }).catch(err => {
        console.error('UPDATE FAILED', err);
    });
});

//autosave router
router.put('/update/new-char', rejectUnauthenticated, (req, res) => {
    pool.query(`
        INSERT INTO "characters" (name, user_id)
            VALUES
    `, [req.body.data, req.user.id]).then(dbres => {
        console.log('*****************AUTOSAVE', req.body);
        res.sendStatus(200)
    }).catch(err => {
        console.error('UPDATE FAILED', err);
    });
});

module.exports = router;
