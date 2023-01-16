const express=require("express");
const cors=require("cors");
const {connection}=require("./config/db");
const {userRoute}=require("./routes/user.route");
const {postRoute}=require("./routes/post.route")
const {authentication}=require("./middlewares/Authentication.middleware");
require("dotenv").config();



const app=express();

app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to home page");
})
app.use("/users",userRoute);
app.use(authentication);
app.use("/posts",postRoute);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
        console.log("Not able to connect to DB");
    }
    console.log(`server is running at port ${process.env.port}`);
})