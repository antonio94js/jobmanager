import mongoose, {
    Schema
}
from 'mongoose';
import bcrypt from 'bcryptjs'
import moment from 'moment'

import validator from '../utils/Validator';


const UserSchema = new Schema({
    _id: {
        type: String,
        required: true,

        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: validator.emailValidator,
        },
        required: true,

    }
});

UserSchema.pre('save', function(next) {

    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });

});

// UserSchema.set('toObject', { virtuals: true });


export default mongoose.model('User', UserSchema);
