import express from 'express'
import { createAssignment, createCourse, csvUpload, getAssignment, getCourses } from '../controllers/courseController.js';
import { adminAuth, auth } from '../middlewares/auth.js';
import singleUpload, { singleCsvUpload } from '../middlewares/multer.js';

const router = express.Router();

 router.get('/courses',getCourses)
//  router.get('/course/:title')
 router.post('/createCourse',auth, adminAuth,singleUpload,createCourse)
 router.post('/csvUpload',singleCsvUpload,csvUpload)
 router.post('/createAssignment',auth,adminAuth, createAssignment)
 router.get('/course/:title',getAssignment)
export default router