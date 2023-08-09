const mongoose = require("mongoose")

const bodyPart = new mongoose.Schema({
    unitId:{
        type: mongoose.Types.ObjectId,
        require: [true, "unitId is require"],
        ref:"unitModel"
    },
    bodyPart: {
        type:String,
        require : [true,"bodyPart is require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
})

module.exports = mongoose.model("bodyPart", bodyPart)