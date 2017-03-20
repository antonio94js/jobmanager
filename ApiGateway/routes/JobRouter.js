import {
    Router
}
from 'express';
import Studio from 'studio';
import JobController from '../controllers/JobController';
// import isAuthenticated from '../policies/isAuthenticated';

const router = Router();

/* The Base Path for this router is /product/Job you can see it on index.js */
//
router
    .get('/', JobController.getJobs)
    .post('/', JobController.createJob)
    .put('/', JobController.updateJob)
    .delete('/', JobController.deleteJob);


export default router;
