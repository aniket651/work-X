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







module.exports = app;
