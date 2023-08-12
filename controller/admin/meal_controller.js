const mealPlanModel = require("../../model/meal_plan_model")
const mealItemsModel = require("../../model/meal_items_model")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")

exports.mealPlanCreate = async (req, res, next) => {
    try {
        const mealPlanData = req.body;

        // const array = JSON.parse(breakFast);
        // const array1 = JSON.parse(morningSnack);
        // const array2 = JSON.parse(lunch);
        // const array3 = JSON.parse(eveningSnack);
        // const array4 = JSON.parse(dinner);

        const item = new mealPlanModel(mealPlanData)

        const itemData = await mealPlanModel.create(item)

        res.status(201).send({
            success: true,
            message: "mealPlan is created...",
            data: itemData
        })
    } catch (error) {
        next(error)
    }
}

exports.allMealPlan = async (req, res, next) => {
    try {

        // const pipeline = [];

        // pipeline.push({
        //     $lookup: {
        //         from: "mealitems",
        //         localField: "id",
        //         foreignField: "breakFast",
        //         as: "dswd"
        //     }
        // })
        // const allitems = await mealPlanModel.aggregate(pipeline)

        const allitems = await mealPlanModel.find({ active: true })
            .populate("breakFast.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
            .populate("morningSnack.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
            .populate("lunch.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
            .populate("eveningSnack.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
            .populate("dinner.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })

        res.status(201).send({
            success: true,
            message: "get all mealItems",
            data: allitems
        })

    } catch (error) {

        next(error)
    }
}

exports.oneMealplan = async (req, res, next) => {
    try {

        const { id } = req.params

        const itemData = await mealPlanModel.findById(id)

        res.status(201).send({
            success: true,
            message: "get all mealItems",
            data: itemData
        })

    } catch (error) {
        next(error)
    }
}
exports.deleteMealPlan = async (req, res, next) => {
    try {

        const { id } = req.params

        const itemData = await mealPlanModel.findByIdAndUpdate(id, { active: false })

        if (!itemData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "user delete successfully",
            data: itemData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateMealPlan = async (req, res, next) => {
    try {

        const { id } = req.params

        const { breakFast, morningSnack, lunch, eveningSnack, dinner } = req.body

        const array = JSON.parse(breakFast);
        const array1 = JSON.parse(morningSnack);
        const array2 = JSON.parse(lunch);
        const array3 = JSON.parse(eveningSnack);
        const array4 = JSON.parse(dinner);

        const itemData = await mealPlanModel.findByIdAndUpdate(id, { $set: { breakFast: array, morningSnack: array1, lunch: array2, eveningSnack: array3, dinner: array4 } })

        if (!itemData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "mealItems update successfully",
            data: itemData
        })

    } catch (error) {
        next(error)
    }
}


