const asyncHandler=require("express-async-handler")
 const Goal=require("../model/goalModel")
 const User=require("../model/userModel")
// get goals
//@route get/api/goals
//@access  private
const getGoals=asyncHandler(async(req,res)=>{
    const goals=await Goal.find({user:req.user.id})
    res.status(200).json({
       goals
    })
})

// delet goals
//@route delete/api/goals/:id
//@access  private
const deleteGoals=asyncHandler(async(req,res)=>{
    const goal =await Goal.findById(req.params.id)
    if(!goal){
        res.status(404)
        throw new Error("goal not found")
    }
    const user =await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("user not found")
    }
    if(goal.user.toString()!==user.id){
        res.status(401)
        throw new Error("you can not edit someone's goal")
    }
    await goal.deleteOne()
    res.status(200).json({msg:"deleted goal",id:req.params.id})
})
// set goals
//@route post/api/goals
//@access  private
const setGoal=asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error("please add text field")
    }
    const goal=await Goal.create({
        text: req.body.text,
        user: req.user.id,
        completed: req.body.completed ?? false // support completed field
    })
    res.status(200).json({
        msg: `set goal is ${goal}`,
        goal
    })
})
// put goals
//@route put/api/goals/:id
//@access  private
const putGoals=asyncHandler(async(req,res)=>{
    const goal =await Goal.findById(req.params.id)
    if(!goal){
        res.status(404)
        throw new Error("goal not found")
    }
    const user =await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("user not found")
    }
    if(goal.user.toString()!==user.id){
        res.status(401)
        throw new Error("you can not edit someone's goal")
    }
    // Only allow updating text and completed fields
    const updateFields = {}
    if (req.body.text !== undefined) updateFields.text = req.body.text
    if (req.body.completed !== undefined) updateFields.completed = req.body.completed

    const updateGoal=await Goal.findByIdAndUpdate(
        req.params.id,
        updateFields,
        {new:true}
    )
    res.status(200).json({
        msg: `updated goal`,
        goal: updateGoal
    })
})



module.exports={
    getGoals,
    deleteGoals,
    setGoal,
    putGoals
}