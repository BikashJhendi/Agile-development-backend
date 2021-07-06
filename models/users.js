const mongoose= require('mongoose')
const User = mongoose.model('User',{
    firstname:{
        type : String,
        required : true
    },
    lastname:{
        type : String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    phone:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
       
    },
    district:{
        type : String,
        required : true
       
    },
    tole:{
        type : String,
        required : true
       
    }

     
})

module.exports = User;