const mealItemsModel = require("../../model/meal_items_model")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")

exports.mealItemCreate = async (req, res, next) => {
    try {
        const { trainer_id, mealItem, calary, description, ingredients } = req.body

        const array = JSON.parse(ingredients);
        // const array1 = JSON.parse(mealItem);

        const item = new mealItemsModel({ trainer_id, mealItem, calary, description, ingredients: array })

        const itemData = await mealItemsModel.create(item)
        if (!itemData) throw createError.NotFound("Not create mealItem..")

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
        const page = parseInt({ active: true }, req.query.page || 1);
        const perPage = 7

        const mealItems = await mealItemsModel.find({ active: true }, req.query.search ? {
            $or: [
                { $and: [{ mealItem: { $regex: req.query.search } }] },
                { $and: [{ calary: { $regex: req.query.search } }] },
                { $and: [{ quantityUnits: { $regex: req.query.search } }] },
            ],
        } : {})
            .limit(perPage * 1)
            .skip((page - 1) * perPage)
            .exec();

            if (!mealItems) throw createError.NotFound("Not found mealItem..")

        res.status(201).send({
            success: true,
            message: "get mealItems",
            data: mealItems
        })

    } catch (error) {
        next(error)
    }
}

exports.trainerMealItems = async (req, res, next) => {
    try {

        const { trainer_id } = req.params

        const itemData = await mealItemsModel.findOne({trainer_id})
        if (!itemData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "get all mealItems",
            data: itemData
        })

    } catch (error) {
        next(error)
    }
}

exports.oneMealItems = async (req, res, next) => {
    try {

        const { id } = req.params

        const itemData = await mealItemsModel.findById(id)
        if (!itemData) throw createError.NotFound("ENTER VALID ID..")

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

        const { mealItem, calary, description, ingredients } = req.body

        const array = JSON.parse(ingredients)

        const itemData = await mealItemsModel.findByIdAndUpdate(id, { $set: { mealItem, calary, description, ingredients: array } })

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


