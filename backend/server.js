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

//connect db
mongoose.connect(process.env.MONG_URI)
    .then(()=> {
        //listen request
        app.listen(process.env.PORT, ()=>{
        console.log("listening on port",process.env.PORT);
        console.log("db connected successfully");
        })
    })
    .catch((error) =>{
        console.log(error);
})
//routes
app.use('/api/inventory/', inventoryRoutes)


