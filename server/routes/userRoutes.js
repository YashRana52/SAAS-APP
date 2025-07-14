
import express from 'express'
import { auth } from '../middlewares/auth.js';
import { getPublicCreation, getUserCreation, toggleLikeCreation } from '../controllers/userController.js';



const userRouter = express.Router();
userRouter.get('/get-user-creations',auth,getUserCreation)
userRouter.get('/get-published-creations',auth,getPublicCreation)
userRouter.post('/toggle-like-creation',auth,toggleLikeCreation)

export default userRouter;
