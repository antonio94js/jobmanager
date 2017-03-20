import Studio from 'studio';
import ErrorHandler from '../handler/ErrorHandler';

const JobComponent = Studio.module('JobComponent'); //Fetching the Comment Microservice

class JobController {

    createJob(req, res, next) {
        const createJob = JobComponent('createJob');
        req.body.userID = req.id;

        createJob(req.body)
            .then(response => res.status(201).json(response))
            .catch(err => ErrorHandler(err, res, req, next));
    }

    updateJob(req, res, next) {
        const updateJob = JobComponent('updateJob');
        req.body.userID = req.id;

        updateJob(req.body)
            .then(response => res.status(200).json(response))
            .catch(err => ErrorHandler(err, res, req, next));
    }

    getJobs(req, res, next) {
        const getJobs = JobComponent('getJobs');
        // req.body.userID = req.id;

        getJobs(req.id)
            .then(response => res.status(200).json(response))
            .catch(err => ErrorHandler(err, res, req, next));
    }

    deleteJob(req, res, next) {
        const deleteJob = JobComponent('deleteJob');
        // req.body.userID = req.id;

        deleteJob(req.query.id)
            .then(response => res.status(200).json(response))
            .catch(err => ErrorHandler(err, res, req, next));
    }
}


const jobController = new JobController();

export default jobController
