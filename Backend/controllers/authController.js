const mongoose = require('mongoose');
const express = require('express');
const logger = require('../utils/logger.js').logger;
const timer = require('../utils/timer.js');
const User = require('../model/UserDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler.js');


exports.verifyToken = async(req, res, next) => {
  logger.debug("verifying token.");
    if(!req.headers.authorization){
      return errorHandler.customErrorHandler(req,res,401,'Authorization header missing');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return errorHandler.customErrorHandler(req,res,401,'Authorization header missing');
    }
  
    try {
      timer.time("token verification");
      // Verify the JWT token
      const decodedToken = jwt.verify(token, 'my-secret-key');
      const userId = decodedToken.userId;
      const user = await User.findById(userId);
      if (!user) {
        timer.timeEnd("token verification");
        return errorHandler.customErrorHandler(req,res,401,"Invalid token");
      }
      // If token is valid, attach the user to the request object for further processing
      req.user = user;
      timer.timeEnd("token verification");
      next();
    } catch (error) {
      timer.timeEnd("token verification");
      logger.error(`error during token verification(token exists): ${error}`);
      return errorHandler.customErrorHandler(req,res,401,"Invalid token");
    }
  };


exports.login = async(req,res)=>{//logins and generates JWT token
    try {
      logger.debug("login process has begun");
        timer.time("login time");
        const user = await User.findOne().where('username').equals(req.body.username)
        if(user == null){
          errorHandler.customErrorHandler(req,res,401,"Invalid Credentials");
        }
        else{
            if(await bcrypt.compare(req.body.password,user.password)){
                const token = jwt.sign({ userId: user._id }, 'my-secret-key', {
                    expiresIn: '1h', // Token will expire in 1 hour
                });
                res.status(200).json({token})
            }
            else errorHandler.customErrorHandler(req,res,401,"Invalid Credentials");
        }

    } catch (error) {
        logger.error(`error during logging in: ${error}`);
        errorHandler.generalErrorHandler(error,req,res);
    }
    finally{
        timer.timeEnd("login time");
    }
}

exports.register = async(req,res,next)=>{
    try {
      logger.debug("user registration has begun!");
      timer.time("register user");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({
            username: req.body.username,
            password: hashedPassword
        })

        res.status(201).send(newUser);

    } catch (error) {
        logger.error(`error while registering user: ${error}`);
        errorHandler.generalErrorHandler(error,req,res);
    }
    finally{
      timer.timeEnd("register user");
    }
}