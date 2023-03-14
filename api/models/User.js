const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {
        type : String,
        required : true,
        max : 20,
        unique : true
    },
    username : {
        type : String,
        min : 3,
        max : 20,
        required : true 
    },
    profilename : {
        type : String,
        min : 3,
        max : 20,
        required : true 
    },
    password : {
        type : String,
        min : 6,
        required : true 
    },
    bio : {
        type : String,
        max : 100,
        default : "" 
    },
    followers : {
        type : Number,
        default : 0
    },
    following : {
        type : Number,
        default : 0
    },
    location : {
        type : String,
        default : ""
    },
    token : {
        type : String,
        default : ""
    }
},
{
    timestamps : true 
})

module.exports = mongoose.model('User' , userSchema);