import Courses from "../models/Courses.js";
import User from "../models/UserModel.js";
import { comparePassword } from "../utils/comparePassword.js";
import CustomError from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        let user = await User.findOne({email})
        if(user) return next(new CustomError("User Already Exist",409))
        const role=email.includes("hero.com")?"admin":"user"
        user = await User.create({
            name,
            email,
            password,
            role
        })
        sendToken(res,user,"Registered Successfully",201)
    }
    catch{
        return next(new CustomError("Please enter all field",400))
    }
    
} 

export const login = async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email}).select("+password")
        if(!user) return next(new CustomError("User Doesn't Exist",409))
        
        const isCorrect = comparePassword(password,user.password)
        
        if(!isCorrect){
            return next(new CustomError("Invalid email or Password",401))
        }
        

        sendToken(res,user,"Login Successfully",200)
    }
    catch{
        return next(new CustomError("Please enter all field",400))
    }
}

export const logout = (req,res,next)=>{
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Logout Successfully"
    })
}

export const myProfile = async (req,res,next)=>{
   try{
       const user = await User.findById(req.user._id)

       res.status(200).json({
        success:true,
        user
       })

   }
   catch{
    return next(new CustomError("Please Login",401))
   }

}

export const addCourse = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user._id);

        const title = req.body.title.toLowerCase()

        const course = await Courses.findOne({title})

        const courseExist = user.courses.find((item)=>{
            if(item.course.toString()===course.title.toString()){
                return true
            }
        })
        
        if (courseExist) return next(new CustomError("Course Already Exists",409))
        await User.findByIdAndUpdate({_id:req.user._id},{$push:{courses:{
            course:course.title,
            image:course.image
        }}})

        // await user.save()

        res.status(200).json({
            success:true,
            message:"Course Added"
        })
    }
    catch{
        return next(new CustomError("Invalid course",404))
    }
}
export const removeCourse = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user._id);

        const title = req.query.title.toLowerCase()

        const course = await Courses.findOne({title})

       
        
      const newList = user.courses.filter((item)=>{
        if(item.course.toString()!==course.title.toString()) return item
      })
      await User.findByIdAndUpdate({_id:user._id},{courses:newList})

        res.status(200).json({
            success:true,
            message:"Course Removed"
        })
    }
    catch{
        return next(new CustomError("Invalid course",404))
    }
}