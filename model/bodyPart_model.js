const mongoose = require("mongoose")

const bodyPart = new mongoose.Schema({
    unitId: {
        type: mongoose.Types.ObjectId,
        required: [true, "unitId is require"],
        ref: "unitModel"
    },
    bodyPart: {
        type: String,
        required: [true, "bodyPart is require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("bodyPart", bodyPart)