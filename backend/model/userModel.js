const { timeStamp } = require("console")
const mongoose=require("mongoose")
const userSchems=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add a name "]
    },
    email:{
        type:String,
        required:[true,"please add a email "]
    }
    ,password:{
        type:String,
        required:[true,"please add a password "]
    }
},{
    timeStamp:true
})

module.exports=mongoose.model("User",userSchems)