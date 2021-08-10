const mongoose = require('mongoose')
const GadgetCart = mongoose.model('gadgetcart', {
    userid: {
        type: String  
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
       
    },
    quantity:{
        type: String,
    },

    productname:{
        type:String
    },

    productprice:{
        type :String
    }
})

module.exports = GadgetCart;