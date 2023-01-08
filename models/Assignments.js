import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Please enter a question"],
        
    },
    marks:{
        type:String,
        required:[true,"Please enter marks"],
    },
    topic:{
        type:String,
        lowercase:true,
        required:[true,"Please enter topic"]
    },
    subTopic:{
        type:String,
        required:[true,"Please enter subTopic"]
    },
    level:{
        type:String,
        required:[true,"Please enter level"]
        
    }

})

export default mongoose.model("Assignments",schema)