const mongoose = require("mongoose")

const waistModel = new mongoose.Schema({
    date:{
        type:Date,
        require:[true,"date is require"]
    },
    waist: {
        type: String,
        require: [true, "waist is require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("waist", waistModel)