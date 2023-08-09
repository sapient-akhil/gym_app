const mongoose = require("mongoose")

const shoulderModel = new mongoose.Schema({
    date:{
        type:Date,
        require:[true,"date is require"]
    },
    shoulder: {
        type: String,
        require: [true, "bodyWeight is require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("shoulder", shoulderModel)