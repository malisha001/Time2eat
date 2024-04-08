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
const orderRoutes = require('./routers/orders')
const cartRoutes = require('./routers/carts')
const onlineOrdersRoutes = require('./routers/onlineOrders')

// Import routers
const bookingRoutes = require('./routers/booking');
const RealTimebookingRoutes = require('./routers/realtimebooking');
const CustomerHistoryRoutes = require('./routers/customerhistoryroute');
const employeesal = require('./routers/employeeSalary');
const restaurants = require('./routers/restaurants');
const feedback = require('./routers/feedbacks');

// Create an instance of Express app
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
//order system routers
app.use('/api/orders',orderRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/onlineOrders', onlineOrdersRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Start the server after successful database connection
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log("Database connected successfully");
        });
    })
    .catch((error) => {
        console.log(error);

    });



