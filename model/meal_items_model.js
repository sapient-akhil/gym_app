const mongoose = require("mongoose");

const mealItemsModel = new mongoose.Schema({
    trainer_id: {
        type: mongoose.Types.ObjectId,
        require: [true, "trainer_id is require"],
    },
    mealItem: {
        type: String,
        require: [true, "mealItems are require"],
        // ref:"mealplans"
    },
    calary: {
        type: String,
        require: [true, "calary are require"]
    },
    // quantityUnits: {
    //     type: String,
    //     require: [true, "quantityUnits are require"]
    // },
    description: {
        type: String,
        require: [true, "description are require"]
    },
    ingredients: {
        type: Array,
        require: [true, "Ingredients are require"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("mealItems", mealItemsModel)