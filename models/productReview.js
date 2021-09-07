const mongoose = require('mongoose')

const productReview = mongoose.model('review', {
    productId:{
        type: String
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    review: {
        type: String,     
    },
    reviewImages: [
        {
            imageName: {
                type: String
            },
            
        }
    ],
    rating: {
       type: String,
    },
    questionDate: {
        type: Number,
        default: Date.now,
    }   
})

module.exports = productReview;