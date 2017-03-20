import Studio from 'studio';
import bcrypt from 'bcryptjs';
import Promise from 'bluebird';
import moment from 'moment';
import _ from 'lodash';
import MessageHandler from '../handler/MessageHandler';
import Job from '../models/Job';
import common from '../utils/Common';
import 'babel-polyfill';


class JobService {

    async createJob(JobData) {
        JobData._id = common.generateID();
        const job = await Job.create(JobData);
        return MessageHandler.messageGenerator(job, true,'job');

    }

    async updateJob(JobData) {
        const job = await Job.findById(JobData._id);
        Object.assign(job, JobData);
        await job.save();
        return MessageHandler.messageGenerator("Job updated succefully", true);
    }

    async getJobs(userID) {
        return await Job.find({userID:userID}).lean(true).select(' -__v'); //By the moment We will only select the user's address and username
    }

    async deleteJob(jobID) {

        await Job.remove({
            _id: jobID
        })
        return MessageHandler.messageGenerator("Job created succefully", true);
    }

}


const jobService = new JobService();

export default jobService;
