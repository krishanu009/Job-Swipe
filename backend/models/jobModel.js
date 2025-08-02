const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
    position:{
        type:String,
        required:[true,"PLease add the position"]
    },
    deadline:{
        type:String
    },
    hrId:{
        type:String,
        required:[true,"PLease add the hrId"]
    },
    company:{
        type:String,
        required:[true,"PLease add the company"],
    }, 
    applicantsCount:{
        type:String
    },
    roleDescription:{
        type:String
    },
    skillsRequired:[],
    keywords:[],
    experianceRequired:{
        type:String
    },
    jobDescription:{
        type:String
    },
    jobStatus:{
        type:String
    },
    companyImage:{
        type:String,
        required:[true,"PLease add the company image"]
    },
    postingDate:{
        type:String
    },
    applicationCount: {
        type:String
    },
    shortlistedCount: {
        type:String
    }

   
})
module.exports = mongoose.model("jobs",jobSchema);
