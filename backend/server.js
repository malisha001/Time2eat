const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routers
const bookingRoutes = require('./routers/booking');
const RealTimebookingRoutes = require('./routers/realtimebooking');
const CustomerHistoryRoutes = require('./routers/customerhistoryroute');
const employeesal = require('./routers/employeeSalary');
const restaurants = require('./routers/restaurants');
const feedback = require('./routers/feedbacks');

// Create an instance of Express app
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Mount routers
app.use('/api/booking', bookingRoutes);
app.use('/api/realtimebooking', RealTimebookingRoutes);
app.use('/api/customerhistoryroute', CustomerHistoryRoutes);
app.use('/api/employeesal', employeesal);
app.use('/api/restaurants', restaurants);
app.use('/api/feedback', feedback);

// Connect to MongoDB database
const MONG_URI = process.env.MONG_URI;
mongoose.connect(MONG_URI)
    .then(() => {
        // Start the server after successful database connection
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log("Database connected successfully");
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
