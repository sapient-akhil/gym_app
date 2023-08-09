const mongoose = require("mongoose");

const mealItemsModel = new mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        require: [true, "clientId is require"],
        // ref: "mealItems"
    },
    breakFast:{
        type: Array,
        require: [true, "breakFast is require"],
        ref: "mealItems"
    },
    morningSnack: {
        type: Array,
        require: [true, "morningSnack are require"],
        ref: "mealItems"
    },
    lunch: {
        type: Array,
        require: [true, "lunch are require"],
        ref: "mealItems"

    },
    eveningSnack: {
        type: Array,
        require: [true, "eveningSnack are require"],
        ref: "mealItems"

    },
    dinner: {
        type: Array,
        require: [true, "dinner are require"],
        ref: "mealItems"

    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("mealPlan", mealItemsModel)