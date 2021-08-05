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

    gadgetname:{
        type:String
    },

    gadgetprice:{
        type :String
    },
})

module.exports = GadgetCart;