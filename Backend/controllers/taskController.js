const mongoose = require('mongoose');
const express = require('express');

const User = require('../model/UserDB');
const Project = require('../model/ProjectDB');
const Task = require('../model/TaskDB');
const errorHandler = require('../utils/errorHandler.js');


exports.createTask = async(req,res)=>{
    try {
        //
        console.log("inside createTask");
        const projects = await Project.findById(req.params.projectId);
        if(!projects){
                errorHandler.customErrorHandler(req,res,400,'no such project found !!');
            }
            
        const username = req.user.username;
        let assigned = req.body.assigned_to;
        if(assigned===undefined){
            assigned = username;
        }
        const newTask = await Task.create({
            name: req.body.name,
            description: req.body.description,
            status: "pending",
            deadline: req.body.deadline,
            assigned_to:  assigned,
            project: projects.name
        })
        res.status(201).send(newTask);

    } catch (error) {
        errorHandler.generalErrorHandler(error, req, res);
    }
}

exports.getTasks = async (req, res) => {
    try {
      console.log("inside getTask");
      const uId = req.user.id;
      const user = await User.findById(uId).populate('tasks');
      if (!user) {
        errorHandler.customErrorHandler(req,res,404,'User not found.');
      }
  
      if (!user.tasks) {
        return res.status(200).json([]);
      }
      res.status(200).json(user.tasks);
    } catch (error) {
      errorHandler.generalErrorHandler(error, req, res);
    }
  };

exports.changeTask = async(req,res)=>{
    try {
        console.log("inside changeTask");
        const project = await Project.findById(req.params.projectId);
        const username = req.user.username;
        if(project.owner != username){
            errorHandler.customErrorHandler(req, res, 403, 'Access Not Granted to this Project !!!');
            return;
        }
        let newName = req.body.name;
        let newDescription = req.body.description;
        let newDeadline = req.body.deadline;
        let newAssigned_to = req.body.assigned_to;
        const assignedUser = await User.findOne({ username: newAssigned_to});
        if(!assignedUser){
            errorHandler.customErrorHandler(req, res, 400, "assigned user is invalid !!");
            return;
        }
        
        const newTask = await Task.findByIdAndUpdate(req.params.taskId,{
            name: newName,
            description: newDescription,
            deadline: newDeadline,
            assigned_to: newAssigned_to
        },{new:true})


        // connect.disconnect();
        res.status(200).send(newTask);
    } catch (error) {
        errorHandler.generalErrorHandler(error, req, res);
    }
}


exports.updateStatus = async(req,res)=>{
    try {
        console.log("inside updateStatus");
        const task = await Task.findById(req.params.taskId);
        const username = req.user.username;
        if(task.assigned_to != username){
            errorHandler.customErrorHandler(req, res, 403, "This Task is not assigned to you !!");
        }

        const newTask = await Task.findByIdAndUpdate(req.params.taskId,{
            status: req.body.status
        },{new:true})

        res.status(200).send(newTask);
    } catch (error) {
        errorHandler.generalErrorHandler(error, req, res);
    }
}



exports.deleteTask = async(req,res)=>{
    try {
        console.log("inside deleteTask");
        const project = await Project.findById(req.params.projectId).populate('tasks');
        const username = req.user.username;
        if(project.owner != username){
            errorHandler.customErrorHandler(req, res, 403, "you dont have access to this whole Project !!");
        }

        const deletedTask = await Task.deleteOne({_id: req.params.taskId})
        res.status(200).send(deletedTask);
    } catch (error) {
        errorHandler.generalErrorHandler(error, req, res);
    }
}