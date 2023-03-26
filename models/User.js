
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    privilege: {
        isAdmin: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: 'visitor',
        },
    }
})

module.exports = { User: mongoose.model('user', UserSchema) };