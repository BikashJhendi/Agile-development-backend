const mongoose = require('mongoose')
const Cosmeticcart = mongoose.model('cosmeticcart', {
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

module.exports = Cosmeticcart;