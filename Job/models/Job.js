import mongoose, {
    Schema
}
from 'mongoose';
import moment from 'moment'



const JobSchema = new Schema({
    _id: {
        type: String,
        required: true,

        unique: true
    },
    userID: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});


export default mongoose.model('Job', JobSchema);
