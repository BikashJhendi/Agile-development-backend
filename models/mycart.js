const mongoose = require('mongoose')
const GadgetCart = mongoose.model('mycart', {
    userid: {
        type: mongoose.Schema.Types.ObjectId,
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    quantity: {
        type: String,
    },

    productname: {
        type: String
    },

    productprice: {
        type: String
    },

    productimage: {
        type: String
    },
    producttype: {
        type: String
    }
})

module.exports = GadgetCart;