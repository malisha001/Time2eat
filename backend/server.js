require('dotenv').config()

const express = require('express');
const inventoryRoutes = require('./routes/inventory')       // import routes folder

//invoke express app
const app = express()

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/inventory/', inventoryRoutes)


// listen to requests
app.listen(process.env.PORT, ()=>{
    console.log("Listening to the port ",process.env.PORT)
})