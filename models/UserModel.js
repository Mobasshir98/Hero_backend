import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,"Please enter your email"],
        minLength:[6,"Password must be atleast 6 characters"],
        select:false,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
    },
    courses:[{
        course:{
            type:String
        },
        image:{
            type:String
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    }

})

schema.pre('save',async function (next){
    const hashedPassword= await bcrypt.hash(this.password,10)
    this.password=hashedPassword
    next()
})


export default mongoose.model("User",schema)