const mongoose = require('mongoose');
const express = require('express');
// const tourController = require('../controllers/tourController');
// const projectController = require('../controllers/projectController');
// const taskController = require('../controllers/taskController');
// const authController = require('../controllers/authController');

const User = require('../model/UserDB');
// const Project = require('../model/ProjectDB');
// const Task = require('../model/TaskDB');

const router = express.Router();

router
    .route('/user/:username')
    .get(async(req, res) => {
        const query = req.params.username;
        try {

            const users = await User.find({
                username: { $regex: new RegExp(query, 'i') },
              }).limit(5);
              res.status(200).send(users);
        } catch (error) {
            res.status(500).send(error);
        }
    });

module.exports = router;