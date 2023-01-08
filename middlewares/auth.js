import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js';
import CustomError from '../utils/errorHandler.js';

export const auth = async (req,res,next)=>{
    try{
        const {token} = req.cookies;

        const data = jwt.verify(token,process.env.SECRET_KEY)
        req.user = await UserModel.findById(data._id)
        next()
    }
    catch{
        return next(new CustomError("Please login to access",401))
    }
}

export const adminAuth = (req,res,next)=>{
    if(req.user.role!=="admin"){
        return next(new CustomError("Not an admin",403))
    }
    else{
        next()
    }
}