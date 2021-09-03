const mongoose = require('mongoose')
const Cosmetic = mongoose.model('cosmetic', {
    cosmeticname: {
        type: String,
        required: true
    },
    cosmeticprice: {
        type: String,
        required: true
    },
    cosmeticgender: {
        type: String,
        required: true,
        enum: ['Men', 'Women'],
    },
    cosmeticmodel: {
        type: String,
        required: true,
    },
    cosmetictype: {
        type: String,
        required: true,
        enum: ['Perfume', 'Nailpolish', 'Lotion']
    },
    featured: {
        type: String,
        enum: ['Featured', 'NotFeatured'],
        default: "NotFeatured"
    },
    cosmeticdescription: [String],
    cosmeticImages: [
        {
            imageName: {
                type: String
            },

        }
    ]

})

module.exports = Cosmetic;