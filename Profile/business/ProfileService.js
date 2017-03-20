import Studio from 'studio';
import bcrypt from 'bcryptjs';
import Promise from 'bluebird';
import moment from 'moment';
import _ from 'lodash';
import MessageHandler from '../handler/MessageHandler';
import Profile from '../models/Profile';
import common from '../utils/Common';
import 'babel-polyfill';


class ProfileService {

    async createProfile(profileData) {
        await Profile.create(profileData);
        return true //resolve the promise

    }

    async updateProfile(profileData) {
        const profile = await Profile.findById(profileData._id);
        Object.assign(profile, profileData);
        await profile.save();
        return MessageHandler.messageGenerator("User profile updated succefully", true);
    }

    async getProfile(userID) {
        return await Profile.findById(userID).lean(true).select(' -__v'); //By the moment We will only select the user's address and username
    }

    async deleteProfile(userID) {

        await Profile.remove({
            _id: userID
        })
        return true
    }

}


const profileService = new ProfileService();

export default profileService;
