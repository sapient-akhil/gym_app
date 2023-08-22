const mongoose = require("mongoose")

const measurmentModel = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "date is required"]
    },
    bodyPartId: {
        type: mongoose.Types.ObjectId,
        required: [true, "bodyPartId is required"],
        ref: "bodyPart"
    },
    unitValue: {
        type: Number,
        required: [true, "unitValue is required"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("measurment", measurmentModel)