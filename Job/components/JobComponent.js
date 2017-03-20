import Studio from 'studio';
import MessageHandler from '../handler/MessageHandler';
// import ErrorLoggerHanlder from '../handler/ErrorLoggerHandler';
import JobService from '../business/JobService';
import {registerMicroservice} from '../handler/StopComponentHandler';

// const WishlistComponent = Studio.module('WishlistComponent');

class JobComponent {

    * createJob(jobData) {
        return yield JobService.createJob(jobData);
    }

    * updateJob(jobData) {
        return yield JobService.updateJob(jobData);
    }

    * deleteJob(jobID) {
        return yield JobService.deleteJob(jobID);
    }

    * getJobs(userID) {
        return yield JobService.getJobs(userID);
    }


}
//return a new instance from your Microservices component
const jobComponent = Studio.serviceClass(JobComponent);

// ErrorLoggerHanlder.setErrorLogger(authComponent)
registerMicroservice(jobComponent);
// UserObject.getUserJob.timeout(3000);
