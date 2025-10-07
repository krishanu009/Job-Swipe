const asyncHandler = require("express-async-handler");

const Job = require("../models/jobModel");
const Applied = require("../models/appliedModel");
const User = require("../models/userModel");
const aiEngine = require("../services/aiEngine");
const moment = require("moment");
//@desc get jobs based on candidate
//@route POST /api/job/jobForMe
//@access private
const getAvailableJobs = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400);
      throw new Error("All the fields are mandatory");
    }
    const currentDate = moment().format("YYYY-MM-DD");

    const appliedJobs = await Applied.find({ candidateId: userId }).select(
      "jobId"
    );
    const appliedJobIds = appliedJobs.map((applied) => applied.jobId);

    const availableJobs = await Job.find({
      deadline: { $gte: currentDate }, // Fetch jobs whose deadline hasn't passed
      _id: { $nin: appliedJobIds }, // Exclude already applied jobs
    });

    res.status(200).json({
      success: true,
      jobs: availableJobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};

const createNewJob = async (req, res) => {
  try {
    const {
      position,
      deadline,
      hrId,
      company,
      applicantsCount,
      roleDescription,
      skillsRequired,
      jobDescription,
      jobStatus,
      companyImage,
      postingDate,
    } = req.body;

    console.log("job controller create new job", req.body);

    if (!position || !hrId || !company || !companyImage || !postingDate) {
      res.status(400);
      throw new Error("All the fields are mandatory");
    }
    const currentDate = moment().format("YYYY-MM-DD");
    const job = await Job.create({
      position,
      deadline,
      hrId,
      company,
      applicantsCount,
      roleDescription,
      skillsRequired,
      jobDescription,
      jobStatus,
      companyImage,
      postingDate,
    });
    if (job) {
      res.status(200).json({
        job,
      });
    } else {
      res.status(400);
      throw new Error("error in creating job!");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error posting jobs",
      error: error.message,
    });
  }
};

const updateJobById = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (updatedJob) {
      res.status(200).json(updatedJob);
    } else {
      res.status(400);
      throw new Error("Error in updating Job");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating job",
      error: error.message,
    });
  }
};

const applyJob = async (req, res) => {
  try {
    const { jobId, candidateId, applicationStatus } = req.body;

    if (!jobId || !candidateId || !applicationStatus) {
      res.status(400);
      throw new Error("All the fields are mandatory");
    }
    const currentDate = moment().format("YYYY-MM-DD");
    const job = await Applied.create({
      jobId,
      candidateId,
      applicationStatus,
      date: currentDate,
    });
    if (job) {
      res.status(200).json({
        job,
      });
    } else {
      res.status(400);
      throw new Error("error in creating job!");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error posting jobs",
      error: error.message,
    });
  }
};

const updateJobApplication = async (req, res) => {
  try {
    const { candidateId, jobId, applicationStatus } = req.body;

    if (!candidateId || !jobId) {
      return res.status(400).json({ message: "All the fields are mandatory" });
    }

    // Await the query result
    const application = await Applied.findOne({ candidateId, jobId }).select(
      "_id applicationStatus"
    );

    console.log("application found:", application);

    if (!application) {
      return res
        .status(404)
        .json({ message: "No application found for this user" });
    }

    // if (application.applicationStatus !== "new") {
    //   // Handle logic for non-'new' application status
    //   return res.status(400).json({ message: "Application is not in 'new' state" });
    // }

    // Proceed to update
    const updatedApplication = await Applied.findByIdAndUpdate(
      application._id,
      {
        applicationStatus,
      },
      { new: true }
    );

    if (updatedApplication) {
      return res.status(200).json(updatedApplication);
    } else {
      return res
        .status(400)
        .json({ message: "Error updating job application" });
    }
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating job application",
      error: error.message,
    });
  }
};
// async function someFunction(req, res) {
//   try {
//     const { generateAiResponse } = await import('../services/aiEngine.mjs'); // ✅ dynamic import

//     const result = await generateAiResponse("your input");
//     res.send(result);
//   } catch (err) {
//     console.error("AI error:", err);
//     res.status(500).send("AI failed");
//   }
// }
const getCreatedJobs = async (req, res) => {
  try {
    // console.log("getCreatedJobs", req.user);
// await someFunction(req, res)
//     if (!req.user.id) {
//       res.status(400);
//       throw new Error("Error in fetching jobs!");
//     }

    // const jobs = [
    //   { id: 1, title: "Software Engineer", createdBy: req.user.id },
    //   { id: 2, title: "Project Manager", createdBy: req.user.id },
    // ];

    // aiEngine.generate("How are you gemini?");

    const jobs = await Job.find({ hrId: req.user.id });
    let jobCountData = {};
    const jobIds = jobs.map((el) => el._id);
    console.log("jobIds", jobIds);
    const appliedJobData = await Applied.find({
      jobId: { $in: jobIds },
    }).select("_id applicationStatus jobId");

    console.log("appliedJobData", appliedJobData);

    appliedJobData.forEach((element) => {
      if (!jobCountData[element.jobId]) {
        jobCountData[element.jobId] = { shortlisted: 0, applicationCount: 0 };
        // jobCountData[element.jobId].shortlisted=0;
        // jobCountData[element.jobId].applicationCount=0;
      }

      if (element.applicationStatus == "shortlisted") {
        jobCountData[element.jobId].shortlisted++;
      } else if (element.applicationStatus == "intrested") {
        jobCountData[element.jobId].applicationCount++;
      }
    });

    //  jobs.forEach(el=>{
    //    el.shortlisted = jobCountData[el._id].shortlisted;
    //    el.applicantsCount = jobCountData[el._id].applicantsCount;
    //  })
    //  console.log("jobCountData",jobCountData);
    const enrichedJobs = jobs.map((job) => {
      const jobObj = job.toObject(); // Convert Mongoose document to plain object
      const counts = jobCountData[job._id] || {
        shortlisted: 0,
        applicationCount: 0,
      };

      jobObj.shortlisted = counts.shortlisted;
      jobObj.applicantsCount = counts.applicationCount;

      return jobObj;
    });
    // console.log("enrichedJobs",enrichedJobs);
    res.status(200).json({
      success: true,
      message: "Jobs retrieved successfully",
      data: enrichedJobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving jobs",
      error: error.message,
    });
  }
};

const getJobApplications = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }

    const { applicationStatus } = req.body;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ success: false, message: "Job ID is mandatory" });
    }

    const jobs = await Job.find({ hrId: req.user.id });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ success: false, message: "No jobs found for this user" });
    }

    const findObj = jobs.find((el) => el._id.toString() === jobId);

    if (!findObj) {
      return res.status(404).json({ success: false, message: "No Job Found with this ID" });
    }

    const jobApplications = await Applied.find({
      jobId,
      applicationStatus,
    }).select("candidateId");

    const candidateIds = jobApplications.map(app => app.candidateId);

    const candidates = await User.find({ _id: { $in: candidateIds } }).select(
      "firstName lastName email phone address experiance project description"
    );

    return res.status(200).json({
      success: true,
      message: "Applications retrieved successfully",
      jobApplications: candidates,
    });
  } catch (error) {
    console.error("Error in getJobApplications:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAnalyticsDataByHr = async (req, res) => {
  
}


module.exports = {
  getAvailableJobs,
  createNewJob,
  updateJobById,
  applyJob,
  updateJobApplication,
  getCreatedJobs,
  getJobApplications,
};
