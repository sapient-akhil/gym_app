const mealItemsModel = require("../../model/meal_items_model")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")

exports.mealItemCreate = async (req, res, next) => {
    try {
        const { mealItem, calary, quantityUnits,description, ingredients } = req.body

        const array = JSON.parse(ingredients);

        const item = new mealItemsModel({ mealItem, calary, quantityUnits,description, ingredients: array })

        const itemData = await mealItemsModel.create(item)

        res.status(201).send({
            success: true,
            message: "mealItems is created...",
            data: itemData
        })
    } catch (error) {
        next(error)
    }
}

exports.allMealItem = async (req, res, next) => {
    try {
        const allitems = await mealItemsModel.find({active:true})

        res.status(201).send({
            success: true,
            message: "get all mealItems",
            data: allitems
        })

    } catch (error) {
        next(error)
    }
}

exports.oneMealItems = async (req, res, next) => {
    try {

        const { id } = req.params

        const item = await params.validateAsync({ id });
        console.log(item)
        
        const itemData = await mealItemsModel.findById(id)

        res.status(201).send({
            success: true,
            message: "get all mealItems",
            data: itemData
        })

    } catch (error) {
        next(error)
    }
}
exports.deleteMealItems = async (req, res, next) => {
    try {

        const { id } = req.params
        const item = await params.validateAsync({ id });
        console.log(item)
        const itemData = await mealItemsModel.findByIdAndUpdate(id, { active: false })

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

exports.updateMealItems = async (req, res, next) => {
    try {

        const { id } = req.params

        const result = await params.validateAsync({ id });
        console.log(result)

        const { mealItem, calary, quantityUnits,description, ingredients } = req.body

        const array = JSON.parse(ingredients)

        const itemData = await mealItemsModel.findByIdAndUpdate(id, { $set: { mealItem, calary, quantityUnits,description, ingredients: array } })

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


