require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const inventoryRoutes = require('./routes/inventory')       // import routes folder

//invoke express app
const app = express()

//middleware
app.use(express.json()); // Add this line to parse JSON bodies
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen to requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB & Listening to the port ", process.env.PORT)
        })

    }).catch((error) => {
        console.log(error)
    })

//routes
app.use('/api/inventory/', inventoryRoutes)


