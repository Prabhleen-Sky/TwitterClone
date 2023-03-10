const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userId : {
        type : String,
    },

    caption : {
        type : String,
        max : 100,
        default : "" 
    },
    likes : {
        type : Array,
        default : []
    },
    retweets : {
        type : Array,
        default : []
    }
},
{
    timestamps : true 
})

module.exports = mongoose.model('Tweet' , tweetSchema);