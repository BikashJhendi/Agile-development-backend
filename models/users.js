const mongoose = require('mongoose')

const User = mongoose.model('User', {
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        // required : true
    },
    password: {
        type: String,
        required: true
    },
    district: {
        type: String,
    },
    tole: {
        type: String,
    },
    img: {
        type: String,
    },
    userType: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }
})

module.exports = User;