const mongoose = require('mongoose');
const express = require('express');

const User = require('../model/UserDB');
const Project = require('../model/ProjectDB');
const Task = require('../model/TaskDB');
const errorHandler = require('../utils/errorHandler.js');

exports.getUserProjects = async(req,res)=>{
    try {
        console.log("inside getUserProjects");
        const uId = req.user.id;
        const projects = await User.findById(uId).populate("projects");

        res.status(200).send(projects.projects);

    } catch (error) {
        errorHandler.generalErrorHandler(error, req, res);
    }
}

exports.createProject = async(req,res)=>{
    try {
        console.log("inside createProject");
        const username = req.user.username;
        const newProject = await Project.create({
            name: req.body.name,
            owner: username,
            aim: req.body.aim,
            deadline: req.body.deadline
        })
        
        res.status(201).send(newProject);


    } catch (error) {
        console.log(error);
        errorHandler.generalErrorHandler(error, req, res);
    }
    
}


exports.getProject = async(req,res)=>{//left to check if user is owner of that project or not
    try {
        const project = await Project.findById(req.params.projectId).populate("tasks");
        res.send(project);
        
    } catch (error) {
        errorHandler.generalErrorHandler(error, req, res);
    }
}

exports.changeProject = async(req,res)=>{
    try {
        console.log("inside changeProduct");
        const project = await Project.findById(req.params.projectId);
        const username = req.user.username;
        if(project.owner != username){
            errorHandler.customErrorHandler(req, res, 403, "you dont have access to this whole Project !!");
        }

        const newProject = await Project.findByIdAndUpdate(req.params.projectId,{
            aim: req.body.aim,
            deadline: req.body.deadline
        },{new:true})

        res.status(200).send(newProject);
    } catch (error) {
        errorHandler.generalErrorHandler(error, req, res);
    }
}



exports.deleteProject = async(req,res)=>{
    try {
        console.log("inside deleteProduct");
        const project = await Project.findById(req.params.projectId).populate('tasks');
        const username = req.user.username;
        if(project.owner != username){
            errorHandler.customErrorHandler(req, res, 403, "you dont have access to this whole Project !!");
        }
        const deleteRelatedTasks = await Task.deleteMany({project: project.name})
        console.log(`deleted Tasks: ${deleteRelatedTasks}`);//********
        const deletedProject = await Project.deleteOne({_id: req.params.projectId})
        console.log(`Deleted Project: ${deletedProject}`);//********
        // connect.disconnect();
        res.status(200).send(deletedProject);
    } catch (error) {
        errorHandler.generalErrorHandler(error, req, res);
    }
}