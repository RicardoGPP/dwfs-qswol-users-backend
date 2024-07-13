const knexconfig = require('../knexfile')['development'];
const knex = require('knex')(knexconfig);
const table = 'user';

/**
 * User repository for database interactions.
 */
class UserRepository {

    /**
     * Gets an user by its ID.
     * 
     * @param {Number} id The ID of the user.
     * @returns A promise.
     */
    find(id) {
        return knex(table).select('*').where({id}).first();
    }

    /**
     * Gets all users.
     * 
     * @returns A promise.
     */
    findAll() {
        return knex(table).select('*');
    }

    /**
     * Creates an user.
     * 
     * @param {Object} user The user to be created.
     * @returns A promise.
     */
    create(user) {
        return knex(table).insert(user);
    }

    /**
     * Updates an user.
     * 
     * @param {Number} id The ID of the user to be updated.
     * @param {Object} user The update user data.
     * @returns A promise.
     */
    update(id, user) {
        return knex(table).where({id}).update(user);
    }

    /**
     * Deletes a user.
     * 
     * @param {Number} id The ID of the user to be deleted.
     * @returns A promise.
     */
    delete(id) {
        return knex(table).where({id}).del();
    }

    /**
     * Deletes all users.
     * 
     * @returns A promise.
     */
    deleteAll() {
        return knex(table).truncate();
    }
}

module.exports = UserRepository;