import dotenv from "dotenv"
// import mongoose from "mongoose"
// import { DB_NAME } from "./constants.js"
import { app } from "./app.js";
// import express from "express";
import connectDB from "./db/index.js";
// const app=express()

dotenv.config({
    path:"./env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 8000,()=>{
        console.log(`app is listening at port:${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("error connection failed mongodb",error)
})



/*
(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("errr:",error)
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("error",error)
        throw error
    }
})()
    */