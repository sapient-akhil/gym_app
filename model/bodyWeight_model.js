const mongoose = require("mongoose")

const bodyWeightModel = new mongoose.Schema({
    date:{
        type:Date,
        require:[true,"date is require"]
    },
    bodyWeight: {
        type: String,
        require: [true, "bodyWeight is require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("bodyWeight", bodyWeightModel)