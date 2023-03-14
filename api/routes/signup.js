const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');
// const SECRET_KEY = "PRERNA_PRABH";

router.get('/', (req,res)=>{
    res.status(200).json( {msg:'GET request to /users/signup'})
})

const signupSchema = joi.object({
    email : joi.string().required().email(),
    password : joi.string().required().min(8),
    username : joi.string().required(),
    profilename : joi.string().required(),
    followers : joi.number(),
    following : joi.number()
})

router.post('/', async(req,res) => {
    const emailExist = await User.findOne({ email : req.body.email })

    if(emailExist){
        res.status(400).send("Email Id already exists")
        return
    }

    try{
        const {error} = await signupSchema.validateAsync(req.body);
        if(!error){
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                _id : new mongoose.Types.ObjectId(),
                email : req.body.email,
                password : hashedPass,
                username : req.body.username,
                profilename : req.body.profilename,
                followers : req.body.followers,
                following : req.body.following 
            })
    
            const result = await user.save();
            res.status(200).json(result)
        }
    }
    catch(error){
        res.status(500).json({message : 'error occured' , err : error})
    }

})

// router.post('/', (req,res) =>{
//   bcrypt.hash(req.body.password, 10)
//     .then(result => {
//         const user = new User({
//             _id : new mongoose.Types.ObjectId(),
//             email : req.body.email,
//             username : req.body.username,
//             profilename : req.body.profilename,
//             password : result,
//           })

//           User.find( {email : req.body.email} )
//           .then( result => {
//              if(result.length === 0){
//                  const token = jwt.sign({ email : user.email, id : user._id}, SECRET_KEY);
//                  user.save()
//                    .then( result => res.status(201).json( {message : 'User Created', userDeatils : result, token : token} ))
//                    .catch(error => res.status(500).json( {message : 'error occured' , err : error} ))         
//              }else{
//                  res.status(400).json( {message : ' Email already exits , try using different email'} )
//              }
//           })
//           .catch( error => res.status(500).json( {message : 'error occured in the DB', err : error} ))
//     })
    
//     .catch( error => res.status(500).json( {message : 'error occured in the DB', err : error} ))


// })

module.exports = router;
