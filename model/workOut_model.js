const mongoose = require("mongoose");

const workOutModel = new mongoose.Schema({
    // clientId:{
    //     type: mongoose.Types.ObjectId,
    //     require: [true, "clientId is require"],
    // },
    exercises_id: {
        type: Array,
        require: [true, "exercises_id are require"],
        ref:"exercises"
    },
    workOutName: {
        type: String,
        require: [true, "workOutName are require"],
    },
    time: {
        type: String,
        require: [true, "time are require"]
    },
    reps: {
        type: String,
        require: [true, "reps are require"]
    },
    set:{
        type: String,
        require: [true, "set are require"]
    },
    volume:{
        type: String,
        require: [true, "volume are require"]
    },
    date:{
        type:Date,
        require: [true, "date are require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("workOut", workOutModel)