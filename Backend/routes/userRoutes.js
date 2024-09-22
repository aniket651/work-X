const mongoose = require('mongoose');
const express = require('express');
const logger = require('../utils/logger.js').logger;
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
            looger.debug("request received to find user by userId");

            const user = await User.findById(req.params.userId);

            if (user == null) {
                res.status(404).send('no such user found !!');
            }
            res.send({
                "username":user.username
            });
        } catch (error) {
            logger.error(`error in finding user by given userId: ${error}`);
            res.status(500).send(error);
        }
    });

router
    .route('/getUserId/:username')
    .get(async(req, res) => {
        try {


            const user = await User.findOne().where('username').equals(req.params.username)

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