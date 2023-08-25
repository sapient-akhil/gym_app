const mongoose = require("mongoose");

const workOutModel = new mongoose.Schema({  
    client_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "exercises_id are require"],
        ref:"clientInfo"
    },
    trainer_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "exercises_id are require"],
        ref:"trainerInfo"
    },
    workOut: [
        {
            exercises_id: {
                type: mongoose.Types.ObjectId,
                required: [true, "exercises_id are require"],
                ref: "exercises"
            },
            workOutName: {
                type: String,
                required: [true, "workOutName are require"],
            },
            reps: {
                type: Number,
                required: [true, "reps are require"]
            },
            set: {
                type: Number,
                required: [true, "set are require"]
            },
            volume: {
                type: String,
                required: [true, "volume are require"]
            },
            _id: false
        }
    ],
    date: {
        type: Date,
        required: [true, "date are require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("workOut", workOutModel)