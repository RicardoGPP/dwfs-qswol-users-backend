//Imports required dependencies.
const express = require('express');
const UserRepository = require('./../repository/user-repository');

//Creates a new route to be used by users.
const router = express.Router();

//Creates user repository.
const userRepository = new UserRepository();

//Sets 'get all users' middleware.
router.get('/', (_, res) => {
    userRepository
        .findAll()
        .then(users => {
            res.setHeader('X-Total-Count', users.length);
            res.status(200).json(users);
        })
        .catch(error => res.status(500).send(`Error getting users: ${error.message}.`))
});

//Sets 'post user' middleware.
router.post('/', (req, res) => {
    userRepository
        .create(req.body)
        .then(ids => userRepository.find(ids[0]))
        .then(user => res.status(201).json(user))
        .catch(error => res.status(500).send(`Error inserting user: ${error.message}.`))
});

//Sets 'get user by id' middleware.
router.get('/:id', (req, res) => {
    const id = req.params.id;

    userRepository
        .find(id)
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

    userRepository
        .update(id, req.body)
        .then(() => userRepository.find(id))
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

    userRepository
        .find(id)
        .then(user => {
            if (!user) {
                return Promise.resolve(null);
            }
            return userRepository.delete(id).then(() => user);
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