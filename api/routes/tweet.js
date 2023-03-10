const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tweet = require('../models/Tweet');
const joi = require('joi');
const verify = require('../authVerify')

const tweetSchema = joi.object({
    caption : joi.string().required().max(100),
})

router.post('/', verify, async(req,res) => {
    try{
        const {error} = await tweetSchema.validateAsync(req.body);
    }catch(error){
          res.status(400).send(error)
    }

    const token = req.header("auth-token");

    const tweet = new Tweet({
        _id : new mongoose.Types.ObjectId(),
        userId : token._id,
        caption : req.body.caption
    })

    const result = await tweet.save();
    res.status(200).json(result)

})

module.exports = router;