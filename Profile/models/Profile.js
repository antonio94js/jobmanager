import mongoose, {
    Schema
}
from 'mongoose';
import moment from 'moment'



const ProfileSchema = new Schema({
    _id: {
        type: String,
        required: true,

        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    ocupation: {
        type: String,
        required: true,
    }
});


export default mongoose.model('Profile', ProfileSchema);
