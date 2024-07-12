exports.seed = async function(knex) {
    await knex('user').del();
    await knex('user').insert([
        {
            name: 'admin',
            email: 'admin@admin.com',
            password: '123456'
        }
    ]);
};