import Assignments from '../models/Assignments.js';
import course  from '../models/Courses.js'
import getDataUri from '../utils/dataUri.js';
import CustomError from '../utils/errorHandler.js';
import cloudinary from 'cloudinary';
import csv from 'csvtojson'

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
        next( new CustomError('No Courses found',404)) 
    }
    
} 


export const createCourse = async (req,res,next)=>{
    try{
    const {title,description,creator} = req.body
    const file = req.file;
    // console.log(file)

    const fileUri= getDataUri(file)
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)

    await course.create({
        title,description,creator,image:mycloud.secure_url
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

export const csvUpload = async (req,res,next)=>{
    try{
        csv().fromFile(req.file.path).then(async (jsonObj)=>{
           const assignments = await Assignments.find()
           if(assignments.length>0){
            const newAssignments = [...assignments,...jsonObj]
            const uniqAssignments = [
                ...new Map(
                    newAssignments.map((item)=>[item["question"],item])
                ).values(),
            ]
            await Assignments.deleteMany({})
            await Assignments.create(uniqAssignments)
            
           }
           else{
            await Assignments.create(jsonObj)
           }
        })

        res.status(201).json({
            success:true,
            message:"Assignment Created Successfully"
        })

    } 
    catch{
        return next(new CustomError("Please add .CSV file ",400) )

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