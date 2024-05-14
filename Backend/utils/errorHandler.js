const express = require('express');


const errorHandler = (err, req, res) => {
    // console.error(err.stack); // Log the error for debugging
    console.error(err.code); // Log the error for debugging

    let statusCode = 500;
    let message = "Internal Server Error :)";

    if (err.code === 11000) { // Handle duplicate error as before
        statusCode = 400;
        message = `Duplicate field error.`; // More generic message
    } else if (err.name === "ValidationError") { // Handle validation errors
        statusCode = 400;
        message = "Validation failed. Please check your input.";
    } else {
        // Handle other errors based on error properties
        
    }

    res.status(statusCode).json({ error: message });

}
 module.exports = errorHandler;