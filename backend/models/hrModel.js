const mongoose = require("mongoose");
const hSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"PLease add the name"]
    },
    lastName:{
        type:String,
        required:[true,"PLease add the name"]
    },
    email:{
        type:String,
        required:[true,"PLease add the email"],
        unique: [true, "Email address already exists"]
    },
    password:{
        type:String,
        required:[true,"PLease add the password"],
    }, 
    phone:{
        type:String,
        required:[true,"PLease add the phone"],
    },
    companyImage:{
        type:String,
        required:[true,"PLease add the company image"],
    },
    company:{
        type:String,
        required:[true,"PLease add the company"],
    }
})
module.exports = mongoose.model("hr",hSchema);
