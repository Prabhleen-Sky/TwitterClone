const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.status(200).json({message : "GET req to /home"})
})

module.exports = router;