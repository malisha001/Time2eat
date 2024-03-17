require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const advertisementRoutes = require('./routes/advertisements')


//express app
const app = express()

//middlewre to parse incomming JSON data
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,res.methode);
    next()
})

//routes
app.use('/api/advertisements',advertisementRoutes)

//connect  to db
mongoose.connect(process.env.MONG_URI)
    .then(()=> {
        //listen requests
        app.listen(process.env.PORT, ()=>{
        console.log("listening on port",process.env.PORT);
        console.log("db connected successfully");
        })
    })  //fire a function when it complets
    .catch((error) =>{
        console.log(error);
})  //to catch any kind of an error if there is