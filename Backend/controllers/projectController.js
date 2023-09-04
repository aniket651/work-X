const mongoose = require('mongoose');
const express = require('express');

const User = require('../model/UserDB');
const Project = require('../model/ProjectDB');
const Task = require('../model/TaskDB');

exports.getUserProjects = async(req,res)=>{
    try {
        //
        // console.log(req);
        console.log(req.user._id);
        console.log("inside getUserProjects");
        // console.log(req.params.userId);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);
        const uId = req.user.id;
        console.log(req.user.id);
        const projects = await User.findById(uId).populate("projects");

        connect.disconnect();
        console.log(projects);
        res.status(200).send(projects.projects);

    } catch (error) {
        res.status(500).send(error)
    }
}

exports.createProject = async(req,res)=>{
    try {
        console.log("inside createProject");
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);
        const username = req.user.username;
        console.log(username);
        const newProject = await Project.create({
            name: req.body.name,
            owner: username,
            aim: req.body.aim,
            deadline: req.body.deadline
        })
        
        connect.disconnect();
        // console.log(newProject);
        res.status(201).send(newProject);


    } catch (error) {
        res.status(500).send(error);
    }
    
}


exports.getProject = async(req,res)=>{//left to check if user is owner of that project or not
    try {
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);
        const project = await Project.findById(req.params.projectId).populate("tasks");
        
        
        connect.disconnect();
        res.send(project);
        
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.changeProject = async(req,res)=>{
    try {
        console.log("inside changeProduct");
        // console.log(req.params.userId);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);
        const project = await Project.findById(req.params.projectId);
        // if(!project){
        //     connect.disconnect();
        //     res.status(400).send('Project not found !!')
        // }
        const username = req.user.username;
        if(project.owner != username){
            connect.disconnect();
            res.status(403).send("you dont have access to this whole Project !!");
        }

        const newProject = await Project.findByIdAndUpdate(req.params.projectId,{
            aim: req.body.aim,
            deadline: req.body.deadline
        },{new:true})


        connect.disconnect();
        res.status(200).send(newProject);
    } catch (error) {
        res.status(500).send(error)
    }
}



exports.deleteProject = async(req,res)=>{
    try {
        console.log("inside deleteProduct");
        // console.log(req.params.userId);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);
        const project = await Project.findById(req.params.projectId).populate('tasks');
        // if(!project){
        //     connect.disconnect();
        //     res.status(400).send('Project not found !!')
        // }
        const username = req.user.username;
        if(project.owner != username){
            connect.disconnect();
            res.status(403).send("you dont have access to this whole Project !!");
        }
        const deleteRelatedTasks = await Task.deleteMany({project: project.name})
        console.log(`deleted Tasks: ${deleteRelatedTasks}`);//********
        const deletedProject = await Project.deleteOne({_id: req.params.projectId})
        console.log(`Deleted Project: ${deletedProject}`);//********
        connect.disconnect();
        res.status(200).send(deletedProject);
    } catch (error) {
        res.status(500).send(error)
    }
}