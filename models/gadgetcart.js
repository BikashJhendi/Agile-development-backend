const mongoose = require('mongoose')
const GadgetCart = mongoose.model('gadgetcart', {
    userid: {
        type: String  
    },
    productid: {
        type: String
       
    },
    quantity:{
        type: String
    }

})

module.exports = GadgetCart;