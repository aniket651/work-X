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
   .get(authController.verifyToken, projectController.getUserProjects)//get all the projects owned by user
   .post(authController.verifyToken, projectController.createProject)//create a new project of the user
router
    .route('/:projectId')
    .get(authController.verifyToken, projectController.getProject)//gets a Particular Project 
    .post(authController.verifyToken, taskController.createTask)//creates Task of the Project
    .patch(authController.verifyToken, projectController.changeProject)//changes only aim or deadline of the project*
    .delete(authController.verifyToken, projectController.deleteProject)//deletes the Project along with all its tasks*
router
    .route('/:projectId/:taskId')
    .patch(authController.verifyToken, taskController.changeTask)//make changes to a particular task of a particular project
    .delete(authController.verifyToken, taskController.deleteTask)//delete a particular task of a particular Project*
module.exports = router;