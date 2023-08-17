const mongoose = require("mongoose")

const unitModel = new mongoose.Schema({
    unit: {
        type: String,
        required: [true, "unit id require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("unitModel", unitModel)