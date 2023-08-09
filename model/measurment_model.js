const mongoose = require("mongoose")

const measurmentModel = new mongoose.Schema({
    date: {
        type: Date,
        require: [true, "date is require"]
    },
    bodyPartId: {
        type: mongoose.Types.ObjectId,
        require: [true, "bodyPartId is require"],
        ref:"bodyPart"
    },
    bodyPartId: {
        type: mongoose.Types.ObjectId,
        require: [true, "bodyPartId is require"],
        ref:"bodyPart"
    },
    unitValue:{
        type:Number,
        require : [true,"weight is require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
})

module.exports = mongoose.model("measurment", measurmentModel)