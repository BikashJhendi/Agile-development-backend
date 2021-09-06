const mongoose = require('mongoose')

const ProductRequest = mongoose.model('ProductRequest', {
    productName: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        enum: ['Gadget', 'Cosmetic', 'Other'],
        required: true
    },
    productLink: {
        type: String,
    },
    productDesription: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Disapproved'],
        default: "Pending"
    },
    requestedDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = ProductRequest;