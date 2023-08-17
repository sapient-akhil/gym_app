const mongoose = require("mongoose");

const workOutModel = new mongoose.Schema({
    // clientId:{
    //     type: mongoose.Types.ObjectId,
    //     require: [true, "clientId is require"],
    // },
    exercises_id: {
        type: Array,
        required: [true, "exercises_id are require"],
        ref:"exercises"
    },
    workOutName: {
        type: String,
        required: [true, "workOutName are require"],
    },
    time: {
        type: String,
        required: [true, "time are require"]
    },
    reps: {
        type: String,
        required: [true, "reps are require"]
    },
    set:{
        type: String,
        required: [true, "set are require"]
    },
    volume:{
        type: String,
        required: [true, "volume are require"]
    },
    date:{
        type:Date,
        required: [true, "date are require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("workOut", workOutModel)