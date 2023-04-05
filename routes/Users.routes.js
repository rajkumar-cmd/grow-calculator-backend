const express=require("express");
const {Usermodel}=require("../models/Users.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userRouter=express.Router();

// Register

userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    // console.log(name,email,password)
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log(err);
            }else{
                const user=new Usermodel({
                    name,
                    email,
                    password:hash,
                })
                await user.save();
                console.log(user)
                res.send({"Register":user})
            }
        });
    }catch(err){
        res.send({"Error":err.message})
    }
})

// LOGIN

userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await Usermodel.find({email});
        console.log(user);
        if(user.length>0){
            const hash=user[0].password;
            brycpt.compare(password,hash,(err,result)=>{
                if(result){
                    const token=jwt.sign({name:user[0].name},"grow")
                    console.log("Login Successfull")
                    res.send({"msg":"Login Successful","token":token})
                }else{
                    res.send({"msg":"Login Failed"})
                }
            })
        }else{
            res.send({"msg":"Login Failed"})
        }
    }catch(err){
        res.send({"msg":"Login Failed","email":email,"Error":err})
    }
})

module.exports={
    userRouter
}