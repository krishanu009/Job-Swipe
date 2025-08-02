const express = require('express');
const validateToken = require('../middlewear/validateTokenHandler');
const router = express.Router();
const {getAvailableJobs,createNewJob,updateJobById,applyJob,updateJobApplication, getCreatedJobs,getJobApplications} = require('../controllers/jobController');



router.get("/createdJobs", validateToken, getCreatedJobs);
router.post("/jobForMe", validateToken, getAvailableJobs);
router.post("/newJob", validateToken, createNewJob);
router.post("/updateJob/:id",validateToken,updateJobById);
router.post("/applyJob",validateToken,applyJob);
router.post("/updateJobApplication",validateToken,updateJobApplication);
router.post("/jobapplications/:id",validateToken,getJobApplications);


module.exports = router;