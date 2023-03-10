const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://prabhleen:Sky1111@cluster0.nmqfc35.mongodb.net/twitter?retryWrites=true&w=majority")
    .then(console.log("Connection to DB successfull."))
    .catch(err => console.log(err))

// routes
const homeRouter = require('./api/routes/home');
app.use('/home', homeRouter);

const loginRoute = require('./api/routes/login');
app.use('/user/login', loginRoute);

const signupRoute = require('./api/routes/signup');
app.use('/user/signup', signupRoute);

const tweetRoute = require('./api/routes/tweet')
app.use('/user/login/createTweet', tweetRoute)

const getAllPost = require('./api/routes/getAllPost');
app.use('/getAllPost', getAllPost)


// error
app.use('/', (req,res) => {
    res.status(200).json({msg:"404,resource not found"});
})

module.exports = app;