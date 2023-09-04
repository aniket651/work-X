const express = require('express');
// const tourController = require('../controllers/tourController');

const router = express.Router();

router
   .route('/')
   .get((req,res)=>{
    res.send({})
   })

module.exports = router;