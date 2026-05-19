const express = require('express');
const router = express.Router();
const Notes = require('../models/Note');


router.get('/', (req, res) => {
    res.send('Welcome to notes');
});

router.post('/',(req,res) => {
    console.log(req.body)
});

module.exports = router;