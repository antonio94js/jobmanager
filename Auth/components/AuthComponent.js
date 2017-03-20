import Studio from 'studio';
import MessageHandler from '../handler/MessageHandler';
// import ErrorLoggerHanlder from '../handler/ErrorLoggerHandler';
import AuthService from '../business/AuthService';
import {registerMicroservice} from '../handler/StopComponentHandler';

// const WishlistComponent = Studio.module('WishlistComponent');

class AuthComponent {

    * loginUser(userData) {
        return yield AuthService.userSignOn(userData);
    }

    * createUser(userData) {
        return yield AuthService.createNewUser(userData);
    }

    * checkAuth(token) {
        return yield AuthService.checkAuth(token);
    }

    * deleteUser(userID) {
        return yield AuthService.deleteUser(userID);
    }

    * getUser(userID) {
        return yield AuthService.getUser(userID);
    }

}
//return a new instance from your Microservices component
const authComponent = Studio.serviceClass(AuthComponent);

// ErrorLoggerHanlder.setErrorLogger(authComponent)
registerMicroservice(authComponent);
// UserObject.getUserProfile.timeout(3000);
