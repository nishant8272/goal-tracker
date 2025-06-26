const express=require("express")
const router=express.Router()
const {protect}=require("../middleWare/authmiddleware")
const {registerUser,loginUser,getMe}=require("../controller/userController")
router.post("/register",registerUser)
router.get("/me",protect,getMe)
router.post("/login",loginUser)

module.exports=router