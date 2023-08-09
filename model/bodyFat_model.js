const mongoose = require("mongoose")

const bodyFatModel = new mongoose.Schema({
    date:{
        type:Date,
        require:[true,"date is require"]
    },
    bodyFat: {
        type: String,
        require: [true, "bodyFat is require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("bodyFat", bodyFatModel)