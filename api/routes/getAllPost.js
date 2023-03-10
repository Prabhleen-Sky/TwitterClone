// guest req post
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("All Post Data")
})

module.exports = router;