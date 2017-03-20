import Studio from 'studio';
import MessageHandler from '../handler/MessageHandler';
// import ErrorLoggerHanlder from '../handler/ErrorLoggerHandler';
import ProfileService from '../business/ProfileService';
import {registerMicroservice} from '../handler/StopComponentHandler';

// const WishlistComponent = Studio.module('WishlistComponent');

class ProfileComponent {

    * createProfile(profileData) {
        return yield ProfileService.createProfile(profileData);
    }

    * updateProfile(profileData) {
        return yield ProfileService.updateProfile(profileData);
    }

    * deleteProfile(token) {
        return yield ProfileService.deleteProfile(token);
    }

    * getProfile(userID) {
        return yield ProfileService.getProfile(userID);
    }


}
//return a new instance from your Microservices component
const profileComponent = Studio.serviceClass(ProfileComponent);

// ErrorLoggerHanlder.setErrorLogger(authComponent)
registerMicroservice(profileComponent);
// UserObject.getUserProfile.timeout(3000);
