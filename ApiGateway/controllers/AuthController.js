import Studio from 'studio';
import ErrorHandler from '../handler/ErrorHandler';
import ensureHeaderAuth from '../policies/isAuthenticated';

// const UserComponent = Studio.module('UserComponent'); //Fetching the User Microservice
// const SellerComponent = Studio.module('SellerComponent'); //Fetching the User Microservice
const AuthComponent = Studio.module('AuthComponent');

class AuthController {

    userLogin(req, res, next) {
        const loginUser = AuthComponent('loginUser');

        loginUser(req.body)
            .then(response => res.status(200).json(response))
            .catch(err => ErrorHandler(err, res, req, next));
    }

    checkAuth(req, res, next) {
        const checkAuth = AuthComponent('checkAuth');
        ensureHeaderAuth(req, res);
        console.log(req.token);
        checkAuth(req.token)
            .then(response => {
                const {id} = response;
                req.id = id;
                next();
            })
            .catch(err => ErrorHandler(err, res, req, next));
    }


}

const authController = new AuthController();

export default authController;
