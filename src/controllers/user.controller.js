import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadonCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser=asyncHandler(async(req,res)=>{
    //  res.status(200).json({
    //     message:"ok"
    // })

    const {fullname,email,username,password}=req.body
    console.log("email",email)
    if(fullname==="" || email==="" || username==="" || password===""){
        throw new ApiError(400,"All fields are required")
    }
    const existedUser=User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"user is already existed")
    }

   

   const avatarLocalPath= req.files?.avatar[0]?.path
   const coverImageLcalPath=req.files?.coverImage[0]?.path
   if(!avatarLocalPath){
    throw new ApiError(400,"avatar file is required")
   }
   const avatar=await uploadonCloudinary(avatarLocalPath)
   const coverImage=await uploadonCloudinary(coverImageLcalPath)

   if(!avatar){
    throw new ApiError(400,"avatar file is required")
   }

   const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:usename.toLowerCase()
   })

   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createdUser){
    throw new ApiError(500,"error while registering user")
   }
   return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
   )
})

export {registerUser}