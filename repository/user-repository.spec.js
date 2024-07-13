const UserRepository = require('./user-repository');

describe('UserRepository', () => {

    let userRepository;

    beforeAll(() => {
        userRepository = new UserRepository();
    });

    beforeEach(async () => {
        await userRepository.deleteAll();
    });

    test('Find, when user does not exist, then must return undefined', async () => {
        const user = await userRepository.find(-1);

        expect(user).toBeUndefined();
    });

    test('Find, when user exists, then must return user', async () => {
        const user1 = {
            name: 'user1',
            email: 'user1@email.com',
            password: '123456'
        };

        const ids = await userRepository.create(user1);

        const user2 = await userRepository.find(ids[0]);

        expect(user2).toStrictEqual(expect.objectContaining(user1));
    });

    test('Find all, when no user exist, then must return an empty array', async () => {
        const users = await userRepository.findAll();

        expect(users).toStrictEqual([]);
    });

    test('Find all, when users exist, then must return a filled array', async () => {
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

        const users = await userRepository.findAll();

        expect(users.length).toStrictEqual(2);
        expect(users[0]).toStrictEqual(expect.objectContaining(user1));
        expect(users[1]).toStrictEqual(expect.objectContaining(user2));
    });

    test('Create, when requested, then must create the user', async () => {
        let users = await userRepository.findAll();

        expect(users.length).toStrictEqual(0);

        const user = {
            name: 'user',
            email: 'user@email.com',
            password: '123456'
        };

        await userRepository.create(user);

        users = await userRepository.findAll();

        expect(users.length).toStrictEqual(1);
        expect(users[0]).toStrictEqual(expect.objectContaining(user));
    });

    test('Update, when requested, then must update the user', async () => {
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

        await userRepository.update(ids[0], user2);

        actualUser = await userRepository.find(ids[0]);

        expect(actualUser).toStrictEqual(expect.objectContaining(user2));
    });

    test('Delete, when requested, then must delete the user', async () => {
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

        await userRepository.delete(ids[0]);

        users = await userRepository.findAll();

        expect(users.length).toStrictEqual(0);
    });

    test('Delete all, when requested, then must delete all users', async () => {
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

        let users = await userRepository.findAll();

        expect(users.length).toStrictEqual(2);

        await userRepository.deleteAll();

        users = await userRepository.findAll();

        expect(users.length).toStrictEqual(0);
    });
});