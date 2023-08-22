const mongoose = require("mongoose");

const trainerModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is require"],
        ref:"clientInfo"
    },
    qualifications: {
        type: String,
        required: [true, "qualifications is require"]
    },
    certifications: {
        type: Array,
        required: [true, "certifications is require"]
    },
    contactdetails: {
        mobilenumber: {
            type: String,
            required: [true, "mobilenumber is require"]
        },
        email: {
            type: String,
            required: [true, "email is require"]
        }
    },
    profilePhoto: {
        type: String,
        // required: [true, "profilePhoto is require"]
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