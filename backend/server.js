const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
//import routers
const employeesal = require('./routers/employeeSalary')
const restaurants = require('./routers/restaurants')
const feedback = require('./routers/feedbacks')
const deliveries = require('./routers/deliveryOrderf')
const bookingRoutes = require('./routers/booking')
const RealTimebookingRoutes = require('./routers/realtimebooking')
const CustomerHistoryRoutes = require('./routers/customerhistoryroute')
const advertisementRoutes = require('./routers/advertisement')
const inventoryRoutes = require('./routers/inventory') 
const orderRoutes = require('./routes/orders')
const cartRoutes = require('./routes/carts')




// express app
const app = express();


// middleware to parse incoming JSON data
app.use(express.json());

// middleware to log request path and method
app.use((req,res,next)=>{
    console.log(req.path,res.methode);
    next()
})

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
//adverticment routers
app.use('/api/advertisements',advertisementRoutes)
//inventory routers
app.use('/api/inventory/', inventoryRoutes)

app.use('/api/orders',orderRoutes)
app.use('/api/carts', cartRoutes)

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



