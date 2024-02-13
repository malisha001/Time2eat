const express = require('express')

//express app
const app = express()

//middlewre to parse incomming JSON data
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,res.methode);
    next()
})

//routers

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