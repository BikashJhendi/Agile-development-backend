const mongoose = require('mongoose')
const Cosmetic = mongoose.model('Cosmetic', {
    cosmeticname: {
        type: String,
        required: true
    },
    cosmeticprice: {
        type: String,
        required: true
    },
    cosmetictype:{
        type: String,
        required: true,
        enum : ['Men','Women'],
    },
    cosmeticdescription: [String],
    cosmeticimage:{
        type: String,
        // required: true
    }

})

module.exports = Cosmetic;