const mongoose = require('mongoose');
const express = require('express');

const User = require('../model/UserDB');
const Project = require('../model/ProjectDB');
const Task = require('../model/TaskDB');

exports.createTask = async(req,res)=>{
    try {
        //
        console.log("inside createTask");
        // console.log(req.params.userId);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);
        const projects = await Project.findById(req.params.projectId);
        if(!projects){
                connect.disconnect();
                res.status(400).send('no such project found !!')
            }
            
        const username = req.user.username;
        console.log(username);
        let assigned = req.body.assigned_to;
        console.log(assigned);
        if(assigned===undefined){
            assigned = username;
        }
        console.log(assigned);
        const newTask = await Task.create({
            name: req.body.name,
            description: req.body.description,
            status: "pending",
            deadline: req.body.deadline,
            assigned_to:  assigned,
            project: projects.name
        })
        connect.disconnect();
        // console.log(projects)
        res.status(201).send(newTask);

    } catch (error) {
        res.status(500).send(error)
    }
}

// exports.getTasks = async(req,res)=>{
//     try {
//         console.log("inside getTask");
//         // console.log(req.params.userId);
//         const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
//         const connect = await mongoose.connect(DB);
//         const uId = req.user.id;
//         const tasks = await User.findById(uId)?.populate('tasks');
//         connect.disconnect();

//         res.status(200).send(tasks.tasks);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// }

exports.getTasks = async (req, res) => {
    try {
      console.log("inside getTask");
      const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
  
      // Establish a database connection
      const connect = await mongoose.connect(DB);
  
      // Assuming req.user.id contains the ID of the user making the request
      const uId = req.user.id;
  
      // Find the user by ID and populate their tasks
      const user = await User.findById(uId).populate('tasks');
  
      // Disconnect from the database
      await mongoose.disconnect();
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if user.tasks is not null before sending the response
      if (!user.tasks) {
        return res.status(200).json([]); // Return an empty array if user.tasks is null
      }
  
      // Send the tasks as a response
      res.status(200).json(user.tasks);
    } catch (error) {
      // Handle database connection error separately
      console.error("Database connection error:", error);
      res.status(500).json({ message: 'Server error.' });
    }
  };

exports.changeTask = async(req,res)=>{
    try {
        console.log("inside changeTask");
        // console.log(req.params.userId);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);

        const project = await Project.findById(req.params.projectId);
        // if(!project){
        //     connect.disconnect();
        //     res.status(400).send('parent project not found !!')
        // }
        const username = req.user.username;
        if(project.owner != username){
            connect.disconnect();
            res.status(403).send('Access Not Granted to this Project !!!')
            return;
        }
        let newName = req.body.name;
        let newDescription = req.body.description;
        let newDeadline = req.body.deadline;
        let newAssigned_to = req.body.assigned_to;
        const assignedUser = await User.findOne({ username: newAssigned_to});
        if(!assignedUser){
            console.log("assigned user is invalid");
            connect.disconnect();
            res.status(400).send("assigned user is invalid !!");
            return;
        }
        
        const newTask = await Task.findByIdAndUpdate(req.params.taskId,{
            name: newName,
            description: newDescription,
            deadline: newDeadline,
            assigned_to: newAssigned_to
        },{new:true})


        connect.disconnect();
        res.status(200).send(newTask);
    } catch (error) {
        res.status(500).send(error);
    }
}


exports.updateStatus = async(req,res)=>{
    try {
        console.log("inside updateStatus");
        // console.log(req.params.userId);
        const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
        const connect = await mongoose.connect(DB);
        const task = await Task.findById(req.params.taskId);
        // if(!task){
        //     connect.disconnect();
        //     res.status(400).send('Task not found !!')
        // }
        const username = req.user.username;
        if(task.assigned_to != username){
            connect.disconnect();
            res.status(403).send("This Task is not assigned to you !!");
        }

        const newTask = await Task.findByIdAndUpdate(req.params.taskId,{
            status: req.body.status
        },{new:true})


        connect.disconnect();
        res.status(200).send(newTask);
    } catch (error) {
        res.status(500).send(error)
    }
}

// exports.updateStatus = async (req, res) => {
//     try {
//       console.log("inside updateStatus");
//       const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
  
//       // Establish a database connection
//       const connect = await mongoose.connect(DB);
  
//       // Assuming req.user.id contains the ID of the user making the request
//       const uId = req.user.id;
  
//       // Find the task by ID
//       let task;
//       try {
//         task = await Task.findById(req.params.taskId);
//       } catch (error) {
//         // Handle error when the Task.findById operation fails
//         connect.disconnect();
//         return res.status(500).json({ message: 'Error finding the task.' });
//       }
//   Check if the task is not found
//       if (!task) {
//         connect.disconnect();
//         return res.status(404).json({ message: 'Task not found.' });
//       }
  
//       // 
//       // Check if the task is not assigned to the user
//       if (task.assigned_to !== uId) {
//         connect.disconnect();
//         return res.status(403).json({ message: 'This Task is not assigned to you.' });
//       }
  
//       // Update the task status
//       const newTask = await Task.findByIdAndUpdate(req.params.taskId, {
//         status: req.body.status
//       }, { new: true });
  
//       // Disconnect from the database
//       await mongoose.disconnect();
  
//       // Send the updated task as a response
//       res.status(200).json(newTask);
//     } catch (error) {
//       // Handle database connection error separately
//       console.error("Database connection error:", error);
//       res.status(500).json({ message: 'Server error.' });
//     }
//   };

exports.deleteTask = async(req,res)=>{
    try {
        console.log("inside deleteTask");
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

        const deletedTask = await Task.deleteOne({_id: req.params.taskId})
        connect.disconnect();
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error)
    }
}