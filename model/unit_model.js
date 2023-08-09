const mongoose = require("mongoose")

const unitModel = new mongoose.Schema({
    unit: {
        type: String,
        require: [true, "unit id require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
})

module.exports = mongoose.model("unitModel", unitModel)