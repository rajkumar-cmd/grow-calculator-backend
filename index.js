const express=require("express");
const {connection}=require("./Config/db.js")
const {userRouter}=require("./routes/Users.routes.js")

// const cors=require("cors");
require("dotenv").config();

const app=express();
// app.use(cors())

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Home Page");
})
app.use("/user",userRouter);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("You are now connected to MongoDB Atlas")
    }catch(err){
        console.log("You are not connected",err)
    }
    console.log(`${process.env.port} is now running`)
})