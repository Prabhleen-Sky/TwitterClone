const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');
// const SECRET_KEY = "PRERNA_PRABH";

const loginSchema = joi.object({
    email : joi.string().email(),
    password : joi.string().min(8)
})

router.post('/', async(req,res)=>{
    try{
        const {error} = await loginSchema.validateAsync(req.body);
    }catch(error){
          res.status(400).send(error)
    }

    const user = await User.findOne({ email : req.body.email})

    if(!user){
        res.status(400).send("Incorrect email id")
        return
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)

    if(validPass){
        const token = jwt.sign({_id:user._id}, `${process.env.Token_Secret}`)
        res.header("auth-token", token).send({message : "login successful",token})
    }else{
        res.status(400).send("invalid password")
    }

})



// router.post('/', (req,res) => {
//     const userEmail = req.body.email;
//     const userPass = req.body.password;

//     User.find( {email : userEmail} )
//       .then( result => {
//         if(result.length === 0){
//             res.status(400).json( {message: 'User does not exist, try again with a different email'}   )
//         }else{
//             bcrypt.compare(userPass , result[0].password)
//               .then(matchPass => {
//                 if(matchPass){
//                     const token = jwt.sign({ email : result[0].email, id : result[0]._id}, SECRET_KEY);
//                     res.status(200).json( {message: 'Authorization Successful', token : token} ) 
//                 }
//                 else{
//                     res.status(400).json( {message: 'Auth Unsucessful, check your password'}   )
//                 }
//               })
              
//         }
//       })
//       .catch(err => res.status(500).json( {message : 'Database Error', error : err}))
// })

module.exports = router;