import Studio from 'studio';
import bcrypt from 'bcryptjs';
import Promise from 'bluebird';
import moment from 'moment';
import _ from 'lodash';
import MessageHandler from '../handler/MessageHandler';
import User from '../models/User';
// import SellerProfile from '../models/SellerProfile';
import jwtHandler from '../handler/jwtHandler';
import common from '../utils/Common';
import 'babel-polyfill';
// import Common from '../utils/Common';
// import request from 'request-promise';

class UserService {

    async createNewUser(userData) {

        const ProfileComponent = Studio.module('ProfileComponent'); // Fetching the Whislist Microservice
        const createProfile = ProfileComponent('createProfile')

        const {
            email, password, ...profileData
        } = userData;
        const _id = common.generateID();

        profileData._id = _id;

        try {
            const user = await User.findOne({email:email});
            console.log(user);

            if (user) throw MessageHandler.errorGenerator("User already exist", 409); //resolve the promise

            await createProfile(profileData);
            await User.create({
                email, password, _id
            });
            return MessageHandler.messageGenerator("User created succefully", true); //resolve the promise
        } catch (e) {
            if (e.name === 'ValidationError')
                throw MessageHandler.errorGenerator("Some fields on the request are invalid or missing",
                    400);

            throw e
        }
    }

    async userSignOn(userData) {

        const user = await User.findOne({
            email: userData.email
        });

        if (!user || !bcrypt.compareSync(userData.password, user.password))
            return MessageHandler.messageGenerator("The credentials are invalid, please check it out", false);

        //
        // const refreshToken = jwtHandler.generateRefreshToken();
        const tokenData = generateUserAccessToken(user);

        return tokenData;

    }

    async checkAuth(token) {

        return await jwtHandler.verifyAccessToken(token);
    }

    async getUser(userID) {
        return await User.findById(userID).lean(true).select('-password  -__v'); //By the moment We will only select the user's address and username
    }

    async deleteUser(userID) {

        const ProfileComponent = Studio.module('ProfileComponent'); // Fetching the Whislist Microservice
        const deleteProfile = ProfileComponent('deleteProfile')
        // const _id = common.generateID();

        await deleteProfile(userID);
        await User.remove({_id:userID});

        return MessageHandler.messageGenerator("User deleted succefully", true); //resolve the promise

    }


}


const generateUserAccessToken = (user) => {

    const userPayload = {
        id: user._id,
    };

    return {
        success: true,
        token: jwtHandler.generateAccessToken(userPayload),
    }
}

const userService = new UserService();

export default userService;
