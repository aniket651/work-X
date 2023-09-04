const mongoose = require('mongoose');
const express = require('express');

const User = require('../model/UserDB');
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.verifyToken = async(req, res, next) => {
    console.log("inside verifyToken");
    if(!req.headers.authorization){
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
  
    try {
      // Verify the JWT token
      const decodedToken = jwt.verify(token, 'my-secret-key');
      // console.log("decoded token is : "+decodedToken);
      console.log(decodedToken);

      const userId = decodedToken.userId;
      console.log("userId is : "+ userId);
      // const user = await User.findOne().where('_id').equals(userId);
      const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
      const connect = await mongoose.connect(DB,{});
      const user = await User.findById(userId);
      connect.disconnect();
      console.log("hjkh");
      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }
    console.log("Token Valid")
 
      // If token is valid, attach the user to the request object for further processing
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: 'Invvvalid token' });
    }
  };


exports.login = async(req,res)=>{//logins and generates JWT token
    try {
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB,{});

        const user = await User.findOne().where('username').equals(req.body.username)

        connect.disconnect();
        if(user == null){
            res.status(401).send('Invalid Credentials');
        }
        else{
            console.log(user)
            if(await bcrypt.compare(req.body.password,user.password)){
                const token = jwt.sign({ userId: user._id }, 'my-secret-key', {
                    expiresIn: '1h', // Token will expire in 1 hour
                });
                res.status(200).json({token})
            }
            else res.status(401).send('Invalid Credentials')
        }

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

exports.register = async(req,res)=>{
    try {
        // const salt = bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(process.env);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB,{});

        const newUser = await User.create({
            username: req.body.username,
            password: hashedPassword
        })

        connect.disconnect();
        res.status(201).send(newUser);

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}