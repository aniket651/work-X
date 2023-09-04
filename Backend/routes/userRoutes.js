const mongoose = require('mongoose');
const express = require('express');
// const tourController = require('../controllers/tourController');
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

const User = require('../model/UserDB');
const Project = require('../model/ProjectDB');
const Task = require('../model/TaskDB');

const router = express.Router();

router
    .route('/getUserName/:userId')
    .get(async(req, res) => {
        try {
            const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
            const connect = await mongoose.connect(DB, {});

            const user = await User.findById(req.params.userId);

            connect.disconnect();
            if (user == null) {
                res.status(404).send('no such user found !!');
            }
            res.send({
                "username":user.username
            });
        } catch (error) {
            res.status(500).send(error);
        }
    });

router
    .route('/getUserId/:username')
    .get(async(req, res) => {
        try {
            const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
            const connect = await mongoose.connect(DB, {});

            const user = await User.findOne().where('username').equals(req.params.username)

            connect.disconnect();
            if (user == null) {
                res.status(404).send('no such user found !!');
            }
            res.send({
                userId: user._id
            })
        } catch (error) {
            res.status(500).send(error)
        }
    })

module.exports = router;