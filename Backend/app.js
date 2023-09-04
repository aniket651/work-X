const express = require('express');
const app = express();

const indexRoutes = require("./routes/indexRoutes");
const projectRoutes = require("./routes/projectRoutes.js");
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const path = require('path');


app.use(cors());//do remove it or configure it before pushing to production. it is here to allow requests from all sources

app.use(express.json());
app.use('/',indexRoutes);
app.use('/auth',authRoutes);
app.use('/projects',projectRoutes);
app.use('/tasks',taskRoutes);
app.use('/user',userRoutes);
// app.use('')



app.use(express.static(path.join(__dirname,'./frontend/build')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
})





module.exports = app;