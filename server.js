import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from 'cloudinary'


connectDB()
cloudinary.v2.config({
    cloud_name:"dec6gy3wy",
    api_key:"355514238263871",
    api_secret:"fkxhW0wjFM1XciQrJGl6kZk-Qn0"
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is runnung on ${process.env.PORT}`)
}) 