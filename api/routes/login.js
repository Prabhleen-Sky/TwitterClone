const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const verify = require('../authVerify')
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
        const token = jwt.sign({_id:user._id, email: user.email}, `${process.env.Token_Secret}`)
        res.header("auth-token", token).send(token)
        user.token = token;
        // res.status(200).json(user);
    }else{
        res.status(400).send("invalid password")
    }

})

// getfollowers
router.get('/', verify, (req, res) => {
    User.find({email : req.body.email})
        .then(result => res.status(200).json( {message: 'My Followers', followers : result[0].followers} ))
        .catch(error => res.status(500).json( {message: 'Server Error', err: error} ))
})

// getfollowing
router.get('/getMyfollowing', verify, (req, res) => {
    User.find({email : req.body.email})
        .then(result => res.status(200).json( {message: 'My Following', following : result[0].following} ))
        .catch(error => res.status(500).json( {message: 'Server Error', err: error} ))
})

// updateUsername
router.patch('/changeUsername', verify, (req,res) => {
        const userEmail = req.body.email;
        const newUsername = req.body.username;

        User.find({ email : userEmail})
        .then(result => { 
           
            updatedUser = {
                _id: result[0]._id,
                email: result[0].email,
                username : newUsername
            }

            User.findByIdAndUpdate(result[0]._id, updatedUser)
            .then(updatedResult => res.status(200).json({message : 'username updated successfully', update : updatedResult}))
            .catch(err => res.status(500).json( {message: 'error occured in the DB', err: err} ))

        })
        .catch(err => res.status(500).json( {message: 'error occured in the DB', err: err} ))
})

// updateProfilename 
router.patch('/changeProfilename', verify, (req,res) => {
    const userEmail = req.body.email;
    const newProfilename = req.body.profilename;

    User.find({ email : userEmail})
    .then(result => { 
       
        updatedUser = {
            _id: result[0]._id,
            email: result[0].email,
            profilename : newProfilename
        }

        User.findByIdAndUpdate(result[0]._id, updatedUser)
        .then(updatedResult => res.status(200).json({message : 'profilename updated successfully', update : updatedResult}))
        .catch(err => res.status(500).json( {message: 'error occured in the DB', err: err} ))

    })
    .catch(err => res.status(500).json( {message: 'error occured in the DB', err: err} ))
})

// get ALL Post
// router.get('/getAllPost',verify,  (req,res)=>{
//     res.send("All Post Data")
// })



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