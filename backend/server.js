require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

//import routers
const employeesal = require('./routers/employeeSalary')
const restaurants = require('./routers/restaurants')
const feedback = require('./routers/feedbacks')
const deliveries = require('./routers/deliveryOrderf')
const bookingRoutes = require('./routers/booking')
const RealTimebookingRoutes = require('./routers/realtimebooking')
const CustomerHistoryRoutes = require('./routers/customerhistoryroute')
const advertisementRoutes = require('./routers/advertisement')
const userRoutes = require('./routes/user')

// express app
const app = express();

//booking routers
app.use('/api/booking', bookingRoutes)
app.use('/api/realtimebooking', RealTimebookingRoutes)
app.use('/api/customerhistoryroute', CustomerHistoryRoutes)
//restaurent routers
app.use('/api/restaurants',restaurants)
//feedback and customer service routers
app.use('/api/feedback',feedback)
//employee salary
app.use('/api/employeesal',employeesal)
//delivery orders routers
app.use('/api/deliveryorder',deliveries)
//advertisement routers
app.use('/api/advertisement',advertisementRoutes)
// user routers
app.use('/api/user', userRoutes)

// middleware to parse incoming JSON data
app.use(express.json());

// middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, res.method);
    next();
});

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

