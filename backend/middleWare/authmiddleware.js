const jwt=require("jsonwebtoken")
const asyncHandler=require("express-async-handler")
const User=require("../model/userModel")

const protect=asyncHandler(async(req,res,next)=>{
    const token=req.header("Authorization")
    if(token && token.startsWith("Bearer")){
        try{
            const realtoken=token.split(" ")[1]
            const decode=jwt.verify(realtoken,process.env.JWT_SECRET)
            req.user=await User.findById(decode.id).select("-password")
 
          next();
        }catch(err){
           console.log(err)
           throw new Error("You are not authenticated")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("You are not enter token")
    }

})
module.exports={protect};