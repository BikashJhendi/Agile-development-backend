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
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    registeredDate: {
        type: Date,
        default: Date.now
    },
    addressBook: {
        province: {
            type: String
        },
        district: {
            type: String
        },
        address: {
            type: String
        },
        tole: {
            type: String
        },
        zipCode: {
            type: String
        }
    },
    accountStatus: {
        type: String,
        enum: ['Active', 'Banned', 'Suspended'],
        default: 'Active'
    }
})

module.exports = User;