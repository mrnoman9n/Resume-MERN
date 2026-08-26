import express from 'express'
import { getUserByID, getUserResume, loginUser, registerUser } from '../controllers/userController.js';
import protect from '../middlewares/authMiddlewares.js';


const userRouter = express.Router();

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)
userRouter.get('/data' , protect , getUserByID)
userRouter.get('/getUserResume', protect , getUserResume)


export default userRouter;