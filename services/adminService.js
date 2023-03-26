const { User } = require('../models/User');

class AdminService {
    findAllUsers = async () => {
        // find all the users from the users collection from mongodb
        const users = await User.find()
        return users;
    }
}

module.exports = { AdminService }
