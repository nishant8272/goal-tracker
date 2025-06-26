const jwt =require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const asyncHandler=require("express-async-handler")
const User = require("../model/userModel");


//desc register new user
//post /api/users/register
//access public

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name||!email||!password){
        return res.status(400).json({message:"Please fill in all fields"})
    }
    const userExist=await User.findOne({email:email});
    if(userExist){
        return res.status(400).json({message:"User already exist"})
        }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password:hashedPassword
        });
        if(user){
            res.status(201).json({message:"User created successfully",
                _id:user.id,
                name:user.name,
                email:user.email,
            token:generateToken(user._id)})
            }
            else{
                res.status(400).json({message:"Failed to create user"})
            }  
})
//desc authantication
//post /api/users/login
//access public

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password)))
        {
            res.status(201).json({message:"User login successfully",
                _id:user.id,
                name:user.name,
                email:user.email,
            token:generateToken(user._id)})
            }            
            else{
                res.status(400).json({message:"invalid credentials"})
            }  

})
//desc get user data
//post /api/users/me
//access private

const getMe=asyncHandler(async(req,res)=>{
    const {_id, name,email}=await User.findById(req.user.id)   

    res.json({msg: "user data display",
        _id:_id,
        name:name,
        email:email,
    })
})

//generate jwt token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}


module.exports={registerUser,
    loginUser,
    getMe
}