const express = require('express');
const cors = require('cors');


const mongoose = require('mongoose');
require('dotenv').config()

//import routers
const inventoryRoutes = require('./routers/inventory') 
const usageRoutes = require('./routers/usageItem.js')

// const advertisementRoutes = require('./routers/advertisements')
const employeesal = require('./routers/employeeSalary')
const restaurants = require('./routers/restaurants')
const fooditems = require('./routers/fooditems')
const feedback = require('./routers/feedbacks')
const deliveries = require('./routers/deliveryOrderf')
const bookingRoutes = require('./routers/booking')
const RealTimebookingRoutes = require('./routers/realtimebooking')
const CustomerHistoryRoutes = require('./routers/customerhistoryroute')
const advertisementRoutes = require('./routers/advertisement')
//const orderRoutes = require('./routers/orders')
const foodrouter = require('./routers/foodrouter')
const userRoutes = require('./routers/user')
const orderRoutes = require('./routers/orders.js')
const cartRoutes = require('./routers/carts')

const onlineOrdersRoutes = require('./routers/onlineOrders')
const employeeLeaveRoutes = require('./routers/employeeLeaves')
const employees = require('./routers/employees')
const payrun = require('./routers/empPayrun')
const leaves = require('./routers/leaves')
const dineinorder = require('./routers/dineinOrder.js')
const { dbconnect } = require('./config/database.config.js');
dbconnect();


// express app
const app = express();


// middleware to parse incoming JSON data
app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000'],
    })
)

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
//fooditems
app.use('/api/fooditems',fooditems)
//feedback and customer service routers
app.use('/api/feedback',feedback)
//employee details
app.use('/api/employees',employees)
//employee salary and leaves
app.use('/api/emppayrun',payrun)
app.use('/api/leaves',leaves)
app.use('/api/employeesal',employeesal)
app.use('/api/employeeleaves',employeeLeaveRoutes)
//delivery orders routers
app.use('/api/deliveryorder',deliveries)
// user routers
app.use('/api/user', userRoutes)
//adverticment routers
// app.use('/api/advertisements',advertisementRoutes)
app.use('/api/inventory/', inventoryRoutes)
app.use('/api/usage/', usageRoutes)

//order system routers
app.use('/api/foods', foodrouter)
app.use('/api/onlineOrders', onlineOrdersRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/dineinorders',dineinorder)



// middleware to parse incoming JSON data
app.use(express.json());

// middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, res.method);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


// connect to db
mongoose.connect(process.env.MONGO_URI)
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
