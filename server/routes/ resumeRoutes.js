import express from 'express'

import protect from '../middlewares/authMiddlewares.js';
import { createResume, deletedResume, getAllResumes , getResumeById, getResumeByPublicId, UpdateResume} from '../controllers/resumeController.js';
import upload from '../configs/multer.js';

const resumeRouter = express.Router();


resumeRouter.post('/create' , protect , createResume)
resumeRouter.delete('/delete/:id' , protect , deletedResume)
resumeRouter.get('/resume/:id' , protect , getResumeById)
resumeRouter.get("/public/:Id", getResumeByPublicId);
resumeRouter.put('/update' , upload.single('image') , protect , UpdateResume)
 resumeRouter.get("/all", protect, getAllResumes);
export default resumeRouter;