import multer from 'multer';


const storage = multer.memoryStorage();

const singleUpload = multer({storage}).single("file")

const csvStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
})

export const singleCsvUpload = multer({storage:csvStorage}).single("file")

export default singleUpload