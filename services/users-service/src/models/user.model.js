const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true // id is unique
    },

    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    }
});

const User = mongoose.model('User', userSchema); //creating the model
module.exports = User;