const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({path : '../config.env'});
// dotenv.config({path: '../config.env'});

const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../model/UserDB');
const authController = require('../controllers/authController')

const router = express.Router();

router
   .route('/register')
   .post(authController.register)

router
   .route('/login')
   .post(authController.login)

module.exports = router;