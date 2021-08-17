const mongoose = require('mongoose')

const Question = mongoose.model('question', {
    productId:{
        type: String
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    askQuestion: {
        type: String,     
    },
    answer: {
        type: String,
    },
    questionDate: {
        type: Date,
        default: Date.now
    }

      
})

module.exports = Question;