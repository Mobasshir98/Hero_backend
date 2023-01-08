import Assignments from '../models/Assignments.js';
import course  from '../models/Courses.js'
import getDataUri from '../utils/dataUri.js';
import CustomError from '../utils/errorHandler.js';

export const getCourses = async (req,res,next)=>{
    try{
    const searchKeyword=req.query.search || "";
    const courses = await course.find({
        title:{
            $regex:searchKeyword,
            $options:"i"
        }
    });
    res.status(200).json({
        success:true,
        courses
    })

    }
    catch(err){
        next(err.message) 
    }
    
} 


export const createCourse = async (req,res,next)=>{
    try{
    const {title,description,creator} = req.body
    const file = req.file;
    // console.log(file)

    const fileUri= getDataUri(file)

    await course.create({
        title,description,creator,image:fileUri.base64
    })
    res.status(201).json({
        success:true,
        message:"Course Created Successfully"
    })
    }
    catch(err){
        console.log(err)
        return next(new CustomError("Please add all fields",400) )
    }
    
} 

export const createAssignment = async (req,res,next)=>{
    try{

    await Assignments.create(req.body)
    res.status(201).json({
        success:true,
        message:"Assignment Created Successfully"
    })
    }
    catch(err){
        // console.log(err)
        return next(new CustomError("Please add all fields",400) )
    }
    
} 

export const getAssignment = async (req,res,next)=>{
    try{
        const topic = req.params.title.toLowerCase()
        const assignments = await Assignments.find({topic})
        res.status(200).json({
            success:true,
            assignments
        })
    }
    catch{
        return next(new CustomError("No Assignments Found",404))
    }
}