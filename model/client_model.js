const mongoose = require("mongoose")

const clientModel = new mongoose.Schema({
    trainer_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "trainer_id is require"],
        // ref:"trainerInfo"
    },
    name: {
        type: String,
        required: [true, "name is require"]
    },
    mobilenumber: {
        type: String,
        required: [true, "mobilenumber is require"]
    },
    email: {
        type: String,
        required: [true, "email is require"]
    },
    address: {
        type: String,
        required: [true, "address is require"]
    },
    password: {
        type: String,
        required: [true, "password is require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("clientInfo", clientModel)