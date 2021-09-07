const mongoose = require('mongoose')
const GadgetCart = mongoose.model('mycart', {
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    quantity: {
        type: Number,
    },

    productname: {
        type: String
    },

    productprice: {
        type: Number
    },

    productimage: {
        type: String
    },
    producttype: {
        type: String
    }
})

module.exports = GadgetCart;