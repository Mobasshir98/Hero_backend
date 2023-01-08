import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title:{
        type:String,
        lowercase:true,
        required:[true,"Please enter course title"],
        
    },
    description:{
        type:String,
        required:[true,"Please enter description"],
    },
    image:{
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:[true,"Enter Course Creator Name"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

export default mongoose.model("Course",schema)