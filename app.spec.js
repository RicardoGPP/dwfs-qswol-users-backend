const app = require('./app');
const request = require('supertest')(app);
const UserRepository = require('./repository/user-repository');

describe('Users API', () => {

    let userRepository;

    beforeAll(() => {
        userRepository = new UserRepository();
    });

    beforeEach(async () => {
        await userRepository.deleteAll();
    });

    test('Get a user, when user does not exist, then must return 404 (Not Found)', async () => {
        const response = await request
            .get('/users/-1')
            .expect('Content-type', /text\/html/);

        expect(response.notFound).toBe(true);
    });

    test('Get a user, when user exists, then must return 200 (OK) and the user', async () => {
        const user1 = {
            name: 'user1',
            email: 'user1@email.com',
            password: '123456'
        };

        const ids = await userRepository.create(user1);

        const user2 = await userRepository.find(ids[0]);

        const response = await request
            .get(`/users/${ids[0]}`)
            .expect('Content-type', /application\/json/);

        expect(response.ok).toBe(true);
        expect(response.body).toStrictEqual(expect.objectContaining(user2));
    });

    test('Get all, when no user exist, then must return 200 (OK) and an empty array', async () => {
        const response = await request
            .get('/users')
            .expect('Content-type', /application\/json/);

        expect(response.ok).toBe(true);
        expect(response.body).toStrictEqual([]);
    });

    test('Get all, when users exist, then must return 200 (OK) and the users', async () => {
        const user1 = {
            name: 'user1',
            email: 'user1@email.com',
            password: '123456'
        };

        await userRepository.create(user1);

        const user2 = {
            name: 'user2',
            email: 'user2@email.com',
            password: '654321'
        };

        await userRepository.create(user2);

        const response = await request
            .get('/users')
            .expect('Content-type', /application\/json/);

        expect(response.ok).toBe(true);
        expect(response.body.length).toStrictEqual(2);
        expect(response.body[0]).toStrictEqual(expect.objectContaining(user1));
        expect(response.body[1]).toStrictEqual(expect.objectContaining(user2));
    });

    test('Post, when requested, then must create the user and returns 201 (Created)', async () => {
        let users = await userRepository.findAll();

        expect(users.length).toStrictEqual(0);

        const user = {
            name: 'user',
            email: 'user@email.com',
            password: '123456'
        };

        const response = await request
            .post('/users')
            .send(user)
            .expect('Content-type', /application\/json/);

        expect(response.created).toBe(true);
        expect(response.body).toStrictEqual(expect.objectContaining(user));

        users = await userRepository.findAll();

        expect(users.length).toStrictEqual(1);
        expect(users[0]).toStrictEqual(expect.objectContaining(user));
    });

    test('Put, when user does not exist, then must return 404 (Not Found)', async () => {
        const user = {
            name: 'user',
            email: 'user@email.com',
            password: '123456'
        };

        const response = await request
            .put('/users/-1')
            .send(user)
            .expect('Content-type', /text\/html/);

        expect(response.notFound).toBe(true);
    });

    test('Put, when user exists, then must update the user and return 200 (OK)', async () => {
        const user1 = {
            name: 'user1',
            email: 'user1@email.com',
            password: '123456'
        };

        const ids = await userRepository.create(user1);

        let actualUser = await userRepository.find(ids[0]);

        expect(actualUser).toStrictEqual(expect.objectContaining(user1));

        const user2 = {
            name: 'user2',
            email: 'user2@email.com',
            password: '654321'
        };

        const response = await request
            .put(`/users/${ids[0]}`)
            .send(user2)
            .expect('Content-type', /application\/json/);

        expect(response.ok).toBe(true);
        expect(response.body).toStrictEqual(expect.objectContaining(user2));

        actualUser = await userRepository.find(ids[0]);

        expect(actualUser).toStrictEqual(expect.objectContaining(user2));
    });

    test('Delete, when user does not exist, then must return 404 (Not Found)', async () => {
        const response = await request
            .delete('/users/-1')
            .expect('Content-type', /text\/html/);

        expect(response.notFound).toBe(true);
    });

    test('Delete, when user exists, then must delete user and return 200 (OK)', async () => {
        let users = await userRepository.findAll();

        expect(users.length).toStrictEqual(0);

        const user = {
            name: 'user',
            email: 'user@email.com',
            password: '123456'
        };

        const ids = await userRepository.create(user);

        users = await userRepository.findAll();

        expect(users.length).toStrictEqual(1);

        const response = await request
            .delete(`/users/${ids[0]}`)
            .send(user)
            .expect('Content-type', /application\/json/);

        expect(response.ok).toBe(true);
        expect(response.body).toStrictEqual(expect.objectContaining(user));

        users = await userRepository.findAll();

        expect(users.length).toStrictEqual(0);
    });

    test('Delete all, when requested, then must delete all users and return 200 (OK)', async () => {
        let users = await userRepository.findAll();

        expect(users.length).toStrictEqual(0);

        const user1 = {
            name: 'user1',
            email: 'user1@email.com',
            password: '123456'
        };

        await userRepository.create(user1);

        const user2 = {
            name: 'user2',
            email: 'user2@email.com',
            password: '654321'
        };

        await userRepository.create(user2);

        users = await userRepository.findAll();

        expect(users.length).toStrictEqual(2);

        const response = await request
            .delete('/users')
            .expect('Content-type', /application\/json/);

        expect(response.ok).toBe(true);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toStrictEqual(expect.objectContaining(user1));
        expect(response.body[1]).toStrictEqual(expect.objectContaining(user2));

        users = await userRepository.findAll();

        expect(users.length).toStrictEqual(0);
    });
});