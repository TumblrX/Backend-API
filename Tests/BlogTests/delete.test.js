const crudFunctions = require('../../controllers/blogFunctions/crudFuntions');

describe('checkEmailPassword', () => {
    it('should return false when the user email and passsword do not match email and password in body', async () => {
        body = {email: 'user@user2.com', password: '123456'};
        userEmail = 'user@user.com',
        userPassword = '$2b$10$LKWnGdFEb6BEN9ZagH9nqu2HWlHHOsZUj5Dre/8PZdvMKeCjJTkaa';
        expect(await crudFunctions.checkEmailPassword(userEmail, userPassword, body)).toBe(false);
        body = {email: 'user@user.com', password: '12345687'};
        expect(await crudFunctions.checkEmailPassword(userEmail, userPassword, body)).toBe(false);
    });

    it('should return true when the user email and passsword match email and password in body', async () => {
        body = {email: 'user@user.com', password: '123456'};
        userEmail = 'user@user.com',
        userPassword = '$2b$10$LKWnGdFEb6BEN9ZagH9nqu2HWlHHOsZUj5Dre/8PZdvMKeCjJTkaa';
        expect(await crudFunctions.checkEmailPassword(userEmail, userPassword, body)).toBe(true);
    });
});
