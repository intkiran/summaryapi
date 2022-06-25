
const config = require('../data/config.json');
const jwt = require('jsonwebtoken');
const Role = require('../models/role');

// users hardcoded for testing, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];
class AuthService {
    constructor(users) {
        this.users = users
    }

    authenticate = (data) => {
        let { username, password } = data;
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            const token = jwt.sign({ sub: user.id, role: user.role }, config.SECRET_KEY);
            const { password, ...userWithoutPassword } = user;
            return {
                ...userWithoutPassword,
                token
            };
        }
    };

}
module.exports = new AuthService(users)

