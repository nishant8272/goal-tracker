const express=require("express")
const colors=require("colors")
const connectDB=require("./config/db")
const dotenv=require("dotenv").config()
const cors=require("cors")
const port=process.env.PORT||8000
connectDB()
const app=express()
app.use(express.json())
app.use(cors())
const {errorHandler}=require("./middleWare/errorMiddleware")
app.use(express.urlencoded({extended:false}))
app.use("/api/goals",require("./routes/goalRoutes"))
app.use("/api/users",require("./routes/userRoutes"))

app.use(errorHandler)
 


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
}) 