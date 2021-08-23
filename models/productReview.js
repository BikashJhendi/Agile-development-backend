const mongoose = require('mongoose')

const productReview = mongoose.model('review', {
    productId:{
        type: String
    },
    review: {
        type: String,     
    },
    reviewReply: {
        type: String,
    },
    reviewImage: {
        type: String,
    },
    rating: {
       type: String,
    },
    questionDate: {
        type: Date,
        default: Date.now
    }   
})

module.exports = productReview;