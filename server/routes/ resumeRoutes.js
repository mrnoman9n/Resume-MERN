import express from 'express'

import protect from '../middlewares/authMiddlewares.js';
import { createResume, deletedResume , getResumeById, getResumeByPublicId, UpdateResume} from '../controllers/resumeController.js';
import upload from '../configs/multer.js';

const resumeRouter = express.Router();


resumeRouter.post('/create' , protect , createResume)
resumeRouter.delete('/delete/:id' , protect , deletedResume)
resumeRouter.get('/resume/:id' , protect , getResumeById)
resumeRouter.get('/public/:id' , protect , getResumeByPublicId)
resumeRouter.put('/update' , upload.single('image') , protect , UpdateResume)
 
export default resumeRouter;