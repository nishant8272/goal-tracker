const express=require("express")
const router=express.Router()
const {protect}=require("../middleWare/authmiddleware")
const {getGoals,setGoal,deleteGoals,putGoals}=require("../controller/goalController")

router.route("/").get(protect,getGoals).post(protect,setGoal)

router.route("/:id").delete(protect,deleteGoals).put(protect,putGoals)




module.exports=router