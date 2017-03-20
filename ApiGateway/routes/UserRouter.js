import {
    Router
}
from 'express';
import Studio from 'studio';
import UserController from '../controllers/UserController';
import isAuthenticated from '../policies/isAuthenticated';
import AuthController from '../controllers/AuthController';

const router = Router();

const UserComponent = Studio.module('UserComponent');

/* The Base Path for this router is /User you can see it on index.js */

router
    .post('/', UserController.createUser)
    .put('/',AuthController.checkAuth, UserController.updateUserProfile)
    .get('/', AuthController.checkAuth, UserController.getUserData)
    .delete('/', AuthController.checkAuth, UserController.deleteUserData)


export default router;
