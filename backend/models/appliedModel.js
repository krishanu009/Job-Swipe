const mongoose = require("mongoose");
const appliedSchema = mongoose.Schema({
    jobId:{
        type:String,
        required:[true,"PLease add the position"]
    },
    candidateId:{
        type:String,
        required:[true,"PLease add the position"]
    },
    date:{
        type:String,
        required:[true,"PLease add the position"]
    },
    applicationStatus:{
        type:String,
        required:[true,"PLease add the position"]
    },
    
    
   
})
module.exports = mongoose.model("appliedJobs",appliedSchema);
