const mongoose = require("mongoose")

const measurmentModel = new mongoose.Schema({
    date: {
        type: Date,
        require: [true, "date is required"]
    },
    bodyPartId: {
        type: mongoose.Types.ObjectId,
        require: [true, "bodyPartId is required"],
        ref:"bodyPart"
    },
    unitValue:{
        type:Number,
        require : [true,"unitValue is required"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
})

module.exports = mongoose.model("measurment", measurmentModel)