const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();
const {Usermodel}=require("../models/user.model");

const userRoute=express.Router();


// /users/register ==> To register a new user.
// /users/login ==> For logging in generating a token
userRoute.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body;
    try {
        const requiredData=await Usermodel.find({email});
        if(requiredData.length>0){
            res.send("You are already register")
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    console.log(err);
                    res.send("something went wrong");
                }else{
                    const savingData=new Usermodel({name,email,gender,password:hash});
                    await savingData.save();
                    res.send("user register successfully!");
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
})
userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const reqireData=await Usermodel.find({email});
        if(reqireData.length>0){
            bcrypt.compare(password,reqireData[0].password,(err,result)=>{
                if(result){
                    var token=jwt.sign({email,userID:reqireData[0]._id},process.env.key);
                    res.send({"message":"Login Successful!","token":token});
                }else{
                    res.send("Wrong Credentials!")
                }
            })
        }else{
            res.send("Register First!")
        }
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
})
// {
//     "name":"rakesh",
//     "email":"rakesh@gmail.com",
//     "gender":"Male",
//     "password":"rakesh12"
//   }
module.exports={
    userRoute
}