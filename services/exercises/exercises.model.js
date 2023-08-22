const mongoose = require("mongoose");

const exercisesModel = new mongoose.Schema({
    exercisesName: {
        type: String,
        required: [true, "exercisesName are require"],
    },
    muscles: {
        type: Array,
        required: [true, "muscles are require"]
    },
    photo: {
        type: String,
        required: [true, "photo are require"]
    },
    description: {
        type: String,
        required: [true, "description are require"]
    },
    videoLink: {
        type: String,
        required: [true, "videoLink are require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("exercises", exercisesModel)