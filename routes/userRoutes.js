import express from 'express'
import { addCourse, login, logout, myProfile, register, removeCourse } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';


const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.get('/me',auth,myProfile)
router.post('/addCourse',auth,addCourse)
router.post('/removeCourse',auth,removeCourse)



export default router