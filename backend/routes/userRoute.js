import createUser from '../controller/user/createUser.js';
import logUser from '../controller/user/logUser.js';
import genResetToken from '../controller/user/genResetToken.mjs';
import checkResetToken from '../controller/user/checkResetToken.mjs';
import resetPassword from '../controller/user/resetPassword.mjs';
import {Router} from 'express';
import upload from '../controller/upImage.js';

const userRouter=Router();

userRouter.route('/').post(upload.single('image'),createUser)
userRouter.post('/log',logUser);
userRouter.post('/pass/email',genResetToken);
userRouter.post('/pass/token/:email',checkResetToken);
userRouter.patch('/pass/:email',resetPassword);
export default userRouter;
