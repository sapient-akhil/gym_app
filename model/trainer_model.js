const mongoose = require("mongoose");

const trainerModel = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is require"],
        ref:"clientInfo"
    },
    qualifications: {
        type: String,
        require: [true, "qualifications is require"]
    },
    certifications: {
        type: Array,
        require: [true, "certifications is require"]
    },
    contactdetails: {
        mobilenumber: {
            type: String,
            require: [true, "mobilenumber is require"]
        },
        email: {
            type: String,
            require: [true, "email is require"]
        }
    },
    profilePhoto: {
        type: String,
        require: [true, "profilePhoto is require"]
    },
    role: {
        type: String,
        default: "trainer"
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("trainerInfo", trainerModel)