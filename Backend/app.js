const express = require('express');
const app = express();

const indexRoutes = require("./routes/indexRoutes");
const projectRoutes = require("./routes/projectRoutes.js");
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes.js');
const cors = require('cors');
const path = require('path');
// const errorMiddleware = require('./utils/errorHandler.js');

app.use(cors());//do remove it or configure it before pushing to production. it is here to allow requests from all sources

app.use(express.json());
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/user', userRoutes);
app.use('/suggestion', suggestionRoutes);


// app.use((err, req, res, next) => {
//     try {
//         console.log(res);
//         res.send(res);
//     } catch (err) {
//         console.error(err.stack); // Log the error for debugging

//         let statusCode = 500;
//         let message = "Internal Server Error :)";

//         if (err.code === 11000) { // Handle duplicate error as before
//             statusCode = 400;
//             message = `Duplicate field error.`; // More generic message
//         } else if (err.name === "ValidationError") { // Handle validation errors
//             statusCode = 400;
//             message = "Validation failed. Please check your input.";
//         } else {
//             // Handle other errors based on error properties

//         }

//         res.status(statusCode).json({ error: message });
//     }

//     // console.error(err.stack); // Log the error for debugging

//     // let statusCode = 500;
//     // let message = "Internal Server Error :)";

//     // if (err.code === 11000) { // Handle duplicate error as before
//     //     statusCode = 400;
//     //     message = `Duplicate field error.`; // More generic message
//     // } else if (err.name === "ValidationError") { // Handle validation errors
//     //     statusCode = 400;
//     //     message = "Validation failed. Please check your input.";
//     // } else {
//     //     // Handle other errors based on error properties

//     // }

//     // res.status(statusCode).json({ error: message });

//     // next();
// });


// app.use(express.static(path.join(__dirname,'./frontend/build')));

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
// })





module.exports = app;
