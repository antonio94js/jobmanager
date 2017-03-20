import {Router} from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();


/* The Base Path for this router is /oauth you can see it on index.js */

router.post('/', AuthController.userLogin);
// router.post('/token/refresh', AuthController.userRefresh);


//TODO refresh token service

// router.post('/token/refresh', UserController.userLogin);
// router.post('/token/reject ', UserController.userLogin);

export default router;
