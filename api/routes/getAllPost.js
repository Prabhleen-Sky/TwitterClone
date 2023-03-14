// guest req post
const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet');
const User = require('../models/User')

// getAllPost
router.get('/', (req,res)=>{
    Tweet.find()
        .then(result => res.status(200).json( {message: 'All Tweets', tweets: result} ))
        .catch(error => res.status(500).json( {message: 'Server Error', err: error} ))
})

// getPostByUsername
router.get('/Username', (req,res)=>{
    User.find( {username : req.body.username} )
    .then (result => {
        if(result.length === 0){
           res.status(400).json("Please fill valid details")
        }else{
            Tweet.find({ userId : result[0]._id})
            .then(ans => {res.status(200).json( {message: 'User tweets ', tweets: ans} )})
            .catch(error => res.status(500).json( {message: 'Server Error', err: error} ))
        }
    })
    .catch(error => res.status(500).json( {message: 'error occured in the DB', err: error} ))
})

module.exports = router;