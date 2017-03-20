import {Router} from 'express';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import JobRouter from './JobRouter';
import AuthController from '../controllers/AuthController';

const router = Router();

router
    .use('/auth', AuthRouter)
    .use('/user', UserRouter)
    .use('/job', AuthController.checkAuth, JobRouter);


export default router;
