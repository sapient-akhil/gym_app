const mongoose = require("mongoose");

const mealItemsModel = new mongoose.Schema({
    trainer_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "trainer_id is require"],
        ref:"trainerInfo"
    },
    mealItem: {
        type: String,
        required: [true, "mealItems are require"],
    },
    calary: {
        type: String,
        required: [true, "calary are require"]
    },
    description: {
        type: String,
        required: [true, "description are require"]
    },
    ingredients: {
        type: Array,
        required: [true, "Ingredients are require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("mealItems", mealItemsModel)