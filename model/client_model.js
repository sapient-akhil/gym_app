const mongoose = require("mongoose")

const clientModel = new mongoose.Schema({
    trainer_id: {
        type: mongoose.Types.ObjectId,
        require: [true, "trainer_id is require"],
        // ref:"trainerInfo"
    },
    name: {
        type: String,
        require: [true, "name is require"]
    },
    mobilenumber: {
        type: String,
        require: [true, "mobilenumber is require"]
    },
    email: {
        type: String,
        require: [true, "email is require"]
    },
    address: {
        type: String,
        require: [true, "address is require"]
    },
    password: {
        type: String,
        require: [true, "password is require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("clientInfo", clientModel)