const mongoose = require('mongoose')
const Gadget = mongoose.model('gadget', {
    gadgetname: {
        type: String,
        required: true
    },
    gadgetprice: {
        type: String,
        required: true
    },
    gadgettype:{
        type: String,
        enum : ['Laptop','camera'],
        required: true
    },
    gadgetdescription: [String],
    
    gadgetimage:{
        type: String,
        // required: true
    }

})

module.exports = Gadget;