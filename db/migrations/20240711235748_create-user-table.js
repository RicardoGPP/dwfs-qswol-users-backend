exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id');
        table.string('name', 150).unique().notNullable();
        table.string('email', 150).unique().notNullable();
        table.string('password', 255).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user');
};