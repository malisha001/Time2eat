const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const employeesal = require('./routers/employeeSalary')

// express app
const app = express();

// middleware to parse incoming JSON data
app.use(express.json());

// middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, res.method);
    next();
});

// routers
app.use('/api/employeesal',employeesal)
// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Listening on port", process.env.PORT);
            console.log("DB connected successfully");
        });
    })
    .catch((error) => {
        console.log(error);
    });
