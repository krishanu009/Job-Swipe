const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
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
    address:[{
        name:{
            type:String
        },
        phone:{
            type:String
        },
        apartment:{
            type:String
        },
        addressLine1:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        pin:{
            type:String
        }

    }],
    experiance:[{
       companyName:{
        type:String
    },
    position:{
        type:String
    },
    startDate:{
        type:String
    },
    endDate:{
        type:String
    },
    description:{
        type:String
    },
    current:{
        type:Boolean
    }

    }],
    project:[{
        projectName:{
         type:String
     },
     domain:{
         type:String
     },
     githubLink:{
         type:String
     },
    liveLink:{
         type:String
     },
     description:{
         type:String
     }
 
     }]
})
module.exports = mongoose.model("User",userSchema);
