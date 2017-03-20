import Studio from 'studio';
import ErrorHandler from '../handler/ErrorHandler';
import Promise from 'bluebird';

const ProfileComponent = Studio.module('ProfileComponent'); //Fetching the User Microservice

const AuthComponent = Studio.module('AuthComponent');

class UserController {

    createUser(req, res, next) {
        const createUser = AuthComponent('createUser');
        // const createUser = ProfileComponent('loginUser');

        createUser(req.body)
            .then(response => res.status(201).json(response))
            .catch(err => ErrorHandler(err, res, req, next));
    }

    updateUserProfile(req, res, next) {
        const updateProfile = ProfileComponent('updateProfile');
        req.body._id = req.id;

        updateProfile(req.body)
            .then(response => res.status(200).json(response))
            .catch(err => ErrorHandler(err, res, req, next));
    }

    getUserData(req, res, next) {
        const getUser = AuthComponent('getUser');
        const getProfile = ProfileComponent('getProfile');

        Promise.all([getUser(req.id), getProfile(req.id)])
            .then(function([user, profile]) {
                if (!user) {
                    res.status(409).json({
                        message: 'This user doesnt exist'
                    })
                    return;
                }

                Object.assign(user, profile);
                res.status(200).json(user);

            }).catch(err => ErrorHandler(err, res, req, next))
    }

    deleteUserData(req, res, next) {
        const deleteUser = AuthComponent('deleteUser');
        // const getProfile = ProfileComponent('getProfile');

        deleteUser(req.id)
            .then(response => res.status(200).json(response))
            .catch(err => ErrorHandler(err, res, req, next));
    }

}

const userController = new UserController();

export default userController;
