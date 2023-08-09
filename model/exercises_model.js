const mongoose = require("mongoose");

const exercisesModel = new mongoose.Schema({
    exercisesName: {
        type: String,
        require: [true, "exercisesName are require"],
    },
    muscles: {
        type: Array,
        require: [true, "muscles are require"]
    },
    photo: {
        type: String,
        require: [true, "photo are require"]
    },
    description: {
        type: String,
        require: [true, "description are require"]
    },
    videoLink: {
        type: String,
        require: [true, "videoLink are require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("exercises", exercisesModel)