const express=require("express");

const {Postmodel}=require("../models/post.model");

const postRoute=express.Router();
// /posts ==> This will show the posts of logged in users.
// /posts/update ==> The logged in user can update his/her posts.
// /posts/delete ==> The logged in user can delete his/her posts.

postRoute.post("/create",async(req,res)=>{
    const payload=req.body;
    try {
        const sendData=new Postmodel(payload);
        await sendData.save();
        res.send("Post added successfully!")
    } catch (error) {
        console.log(error);
        res.json({err:error.message})
    }
})
// Following functionalities should also be there.
// 1. If the device name is passed as query, then it should show only those posts from which device 
//that post has been made.
//  2. For Example, device=MOBILE ==> will give mobile posts only.
// 3. device1=MOBILE & device2=PC ==> will give the posts made by mobile and PC.
postRoute.get("/",async(req,res)=>{
    const userID=req.body.userID;
    const device=req.query.device;
    const {device1,device2}=req.query;
    if(device==undefined&&device1==undefined&&device2==undefined){
        try {
            const reqData=await Postmodel.find({userID});
            if(reqData.length>0){
                res.json(reqData)
            }else{
                res.send("First create a post!")
            }
            
        } catch (error) {
            console.log(error);
            res.json({err:error.message})
        }
    }else if(device!=undefined&&device1==undefined&&device2==undefined){
        try {
            const reqData=await Postmodel.find({userID,device});
            if(reqData.length>0){
                res.json(reqData)
            }else{
                res.send("First create a post!")
            }
            
        } catch (error) {
            console.log(error);
            res.json({err:error.message})
        }
    }else if(device==undefined&&device1!=undefined&&device2!=undefined){
        try {
            const reqData=await Postmodel.find({userID,device:device1,device:device2});
            if(reqData.length>0){
                res.json(reqData)
            }else{
                res.send("First create a post!")
            }
            
        } catch (error) {
            console.log(error);
            res.json({err:error.message})
        }
    }else{
        res.send("Invalid request!")
    }
    
})

postRoute.patch("/update/:id",async(req,res)=>{
    const userID=req.body.userID;
    const data=req.body
    const id=req.params.id;
    const post=await Postmodel.findOne({_id:id});
    const userID_post=post.userID;
    try {
        if(userID!=userID_post){
            res.json({"message":"You are not authorized!"});
        }else{
            await Postmodel.findByIdAndUpdate({_id:id},data);
            res.send(`Post of id ${id} was successfully updated`)
        }  
    } catch (error) {
        console.log(error);
        res.json({err:error.message})
    }
})

postRoute.delete("/delete/:id",async(req,res)=>{
    const userID=req.body.userID;
    const id=req.params.id;
    const post=await Postmodel.findOne({_id:id});
    const userID_post=post.userID;
    try {
        if(userID!=userID_post){
            res.json({"message":"You are not authorized!"});
        }else{
            await Postmodel.findByIdAndDelete({_id:id});
            res.send(`Post of id ${id} was successfully deleted`)
        }  
    } catch (error) {
        console.log(error);
        res.json({err:error.message})
    }
})
// "title":"ps class",
//     "body":"it is average",
//     "device":"TABLET"
module.exports={
    postRoute
}