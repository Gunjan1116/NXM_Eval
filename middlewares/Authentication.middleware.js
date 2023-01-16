const jwt=require("jsonwebtoken");
require("dotenv").config();
const authentication=(req,res,next)=>{
    const token=req.headers.authorization;
    try {
        if(token){
            const decoded=jwt.verify(token,process.env.key);
            const userID=decoded.userID;
            if(decoded){
                req.body.userID=userID;
                next();
            }else{
                res.send("Please Login First1!")
            }
        }else{
            res.send("Please Login First!")
        }
    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
}

module.exports={
    authentication
}