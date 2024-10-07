const User = require('../models/UserModel');

class UserRepository {
    async createUser(userData) {
        const user = new User(userData);
        await user.save();
        return user;
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findById(userId) {
        return await User.findById(userId);
    }
}

module.exports = new UserRepository();

