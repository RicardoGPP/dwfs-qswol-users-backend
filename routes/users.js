//Imports required dependencies.
const express = require('express');
const knexconfig = require('../knexfile')['development'];
const knex = require('knex')(knexconfig);

//Creates a new route to be used by users.
const router = express.Router();

//Defines the user table name.
const userTable = 'user';

//Sets 'get all users' middleware.
router.get('/', (_, res) => {
    knex(userTable)
        .select('*')
        .then(users => {
            res.setHeader('X-Total-Count', users.length);
            res.status(200).json(users);
        })
        .catch(error => res.status(500).send(`Error getting users: ${error.message}.`))
});

//Sets 'post user' middleware.
router.post('/', (req, res) => {
    knex(userTable)
        .insert(req.body)
        .then(ids => {
            return knex(userTable)
                .where({id: ids[0]})
                .first();
        })
        .then(user => res.status(201).json(user))
        .catch(error => res.status(500).send(`Error inserting user: ${error.message}.`))
});

//Sets 'get user by id' middleware.
router.get('/:id', (req, res) => {
    const id = req.params.id;

    knex(userTable)
        .select('*')
        .where({id})
        .first()
        .then(user => {
            if (!user) {
                res.status(404).send(`No user could be found with ID ${id}.`);
            } else {
                res.status(200).json(user);
            }
        })
        .catch(error => res.status(500).send(`Error getting user of ID ${id}: ${error.message}.`));
});

//Sets 'put user' middleware.
router.put('/:id', (req, res) => {
    const id = req.params.id;

    knex(userTable)
        .where({id})
        .update(req.body)
        .then(() => {
            return knex(userTable)
                .select('*')
                .where({id})
                .first();
        })
        .then(user => {
            if (!user) {
                res.status(404).send(`No user could be found with ID ${id}.`);
            } else {
                res.status(200).json(user)
            }
        })
        .catch(error => res.status(500).send(`Error updating user of ID ${id}: ${error.message}.`));
});

//Sets 'delete user' middleware.
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    knex(userTable)
        .select('*')
        .where({id})
        .first()
        .then(user => {
            if (!user) {
                return Promise.resolve(null);
            }
            return knex(userTable)
                    .where({id})
                    .delete()
                    .then(() => user);
        })
        .then(user => {
            if (!user) {
                res.status(404).send(`No user could be found with ID ${id}.`);
            } else {
                res.status(200).json(user)
            }
        })
        .catch(error => res.status(500).send(`Error deleting user of ID ${id}: ${error.message}.`));
});

//Exports router.
module.exports = router;