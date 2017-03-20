import jwt from 'jsonwebtoken';
import randtoken from 'rand-token'
import config from '../config/config';
import Promise from 'bluebird';


const generateAccessToken = (payload) => jwt.sign(payload, config.getPrivateTokenKey(), {
    expiresIn: '1d'
});

const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.getPrivateTokenKey(), (err, decodedToken) => {

            if (err)
                reject({
                    "Message": "The Authentication token is invalid"
                })
            resolve(decodedToken);
        });
    })

};


export default {
    generateAccessToken, verifyAccessToken
}
