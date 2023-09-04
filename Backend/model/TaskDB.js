const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : '../config.env'});

const User = require('./UserDB');
const Project  = require('./ProjectDB');

const taskSchema = new mongoose.Schema({
    name:{
      type: String,
      required:[true,'a Project must have name'],
      unique: true
    },
    description:{
        type: String,
        required:[true,'a task must have description']
    },
    status:{
        type: String,
        enum : ['completed','in-progress','pending'],
        default: 'pending'
    },
    deadline:{
      type: Date,
      required:[true,'deadline is must be it sooner or later']
    },
    assigned_to:{
        type: String,
        ref : 'User'
    },
    project:{
        type: String,
        ref : 'Project'
    }
    
})

// taskSchema.set('toObject',{virtuals:true});
// taskSchema.set('toJSON',{virtuals:true});


// taskSchema.virtual('project', {
//     'ref' : 'Project',
//     localField : '_id',
//     foreignField : 'owner'
// })

// taskSchema.virtual('assigned_to', {
//     'ref' : 'Task',
//     localField : '_id',
//     foreignField : 'assigned_to'
// })



const Task = mongoose.model('Task',taskSchema);

module.exports = Task;
