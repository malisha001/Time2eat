




const bookingRoutes = require('./routers/booking')
const RealTimebookingRoutes = require('./routers/realtimebooking')
const CustomerHistoryRoutes = require('./routers/customerhistoryroute')


const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const employeesal = require('./routers/employeeSalary')
const restaurants = require('./routers/restaurants')
const feedback = require('./routers/feedbacks')
const deliveries = require('./routers/deliveryOrderf')



// express app
const app = express();


app.use('/api/booking', bookingRoutes)
app.use('/api/realtimebooking', RealTimebookingRoutes)
app.use('/api/customerhistoryroute', CustomerHistoryRoutes)
//routers

// middleware to parse incoming JSON data
app.use(express.json());

// middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, res.method);
    next();
});

// routers
app.use('/api/employeesal',employeesal)
app.use('/api/restaurants',restaurants)
app.use('/api/feedback',feedback)
app.use('/api/deliveryorder',deliveries)


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
