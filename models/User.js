const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null
    }
})
userSchema.index({username: 'text'});
const Users = mongoose.model('users', userSchema);
Users.createIndexes({username: 'text'});

module.exports = Users;