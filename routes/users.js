const express = require('express');
const UserRepository = require('./../repository/user-repository');
const router = express.Router();
const userRepository = new UserRepository();

router.get('/', (_, res) => {
    userRepository
        .findAll()
        .then(users => {
            res.setHeader('X-Total-Count', users.length);
            res.status(200).json(users);
        });
});

router.post('/', (req, res) => {
    userRepository
        .create(req.body)
        .then(ids => userRepository.find(ids[0]))
        .then(user => res.status(201).json(user));
});

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
        });
});

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
        });
});

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
        });
});

router.delete('/', (_, res) => {
    userRepository
        .findAll()
        .then((users) => userRepository.deleteAll().then(() => users))
        .then((users) => res.status(200).json(users));
});

module.exports = router;