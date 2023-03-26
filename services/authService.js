const { User } = require('../models/User')

class AuthService {
    findUser = async (query) => {
        const result = await User.findOne(query)
        return result
    }

    signUp = async (userData, password) => {
        // if (userData.external) {
        //     const user = {}
        //     user.name = userData.name
        //     user.email = userData.email
        //     user.password = password
        //     user.place = userData.place
        //     const response = await User.create(user)
        //     return response
        // }
        const user = {}
        user.name = userData.name
        user.email = userData.email
        user.password = password
        user.place = userData.place
        const createdUser = await User.create(user);
        
        const response = {
            name: createdUser.name, 
            email: createdUser.email,
            place: createdUser.place,
            privilege: createdUser.privilege,
        }

        return response
    }

    updateUser = async (userData, password) => {
        const user_id = userData.id
        if (password !== '') {
            const response = await User.findByIdAndUpdate(user_id, {
                password: password,
                external: false,
            })
            return response
        }
        return null
    }

    // updateProfile = async (id, userData, password) => {
    //     const user = await User.findOne({
    //         id: id,
    //     })
    //     if (user) {
    //         user.password = password
    //         user.contact = userData.contact
    //         user.place = userData.place
    //         user.role = userData.roleId
    //         user.external = true
    //         const response = await User.save(user)
    //         return response
    //     }
    //     return null
    // }
}

module.exports = { AuthService }
