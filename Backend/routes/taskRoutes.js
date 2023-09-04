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
   .route('/')
   .get(authController.verifyToken, taskController.getTasks)
   .post(authController.verifyToken, projectController.createProject)


router
    .route('/:taskId')
    .patch(authController.verifyToken, taskController.updateStatus)



router
    .route('/:projectId')
    .get(authController.verifyToken, projectController.getProject)//gets a Particular Project 
    .post(authController.verifyToken, taskController.createTask)//creates Task of the Project


module.exports = router;