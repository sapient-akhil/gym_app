const mongoose = require("mongoose");

const mealItemsModel = new mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        required: [true, "clientId is require"],
        ref:"clientInfo"
    },
    breakFast: [
        {
            mealItemsId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "mealItems"
            },
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            },
            _id: false
        }
    ],
    morningSnack: [
        {
            mealItemsId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "mealItems"
            },
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            },
            _id: false
        }
    ],
    lunch: [
        {
            mealItemsId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "mealItems"
            },
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            },
            _id: false
        }
    ],
    eveningSnack: [
        {
            mealItemsId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "mealItems"
            },
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            },
            _id: false
        }
    ],
    dinner: [
        {
            mealItemsId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "mealItems"
            },
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            },
            _id: false
        }
    ],
    date: {
        type: Date,
        required: [true, "date is required"]
    },
    active: {
        type: Boolean,
        default: "true"
    }
}, { timestamps: true })

module.exports = mongoose.model("mealPlan", mealItemsModel)