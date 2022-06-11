const express = require ('express')
const app = express()
const cors = require("cors");



//myRoutes
const connectDB = require('./db.config/config')
const userRouter = require('./router/userRouter')
const ticketRouter = require('./router/ticketRouter')



//connect database
connectDB()

//Middleware
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}));


//Routes
app.use('/api/users' , userRouter )
app.use('/ticket',ticketRouter)



//server connection
const port = process.env.PORT || 5000 ;
app.listen(port , (err)=>{
    if(err){
        console.log("server not conntected ", err);
    } else{
        console.log("sever is up and working " + port);
    }
})