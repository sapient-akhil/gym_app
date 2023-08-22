const mongoose = require("mongoose");

const mealItemsModel = new mongoose.Schema({
    trainer_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "trainer_id is require"],
    },
    mealItem: {
        type: String,
        required: [true, "mealItems are require"],
        // ref:"mealplans"
    },
    calary: {
        type: String,
        required: [true, "calary are require"]
    },
    // quantityUnits: {
    //     type: String,
    //     require: [true, "quantityUnits are require"]
    // },
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