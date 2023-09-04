const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : '../config.env'});

const Project = require('./ProjectDB');
const Task = require('./TaskDB');


const userSchema = new mongoose.Schema({
    username:{
      type: String,
      required:[true,'a user must have name'],
      unique: true
    },
    password:{
        type: String,
        required:[true,'a strong password is neccessary']
    }
    // projects:[{
    //     type : mongoose.SchemaTypes.ObjectId,
    //     ref : 'Project'
    // }],
    // tasks:[{
    //     type : mongoose.SchemaTypes.ObjectId,
    //     ref : 'Task'
    // }]
})

userSchema.set('toObject',{virtuals:true});
userSchema.set('toJSON',{virtuals:true});


userSchema.virtual('projects', {
    'ref' : 'Project',
    localField : 'username',
    foreignField : 'owner'
})

userSchema.virtual('tasks', {
    'ref' : 'Task',
    localField : 'username',
    foreignField : 'assigned_to'
})

const User = mongoose.model('User',userSchema);

module.exports = User;
//would use virtual and populate to show projects and tasks