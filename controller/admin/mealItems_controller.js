const mealItemsModel = require("../../model/meal_items_model")
const createError = require("http-errors")

exports.mealItemCreate = async (req, res, next) => {
    try {
        const { trainer_id, mealItem, calary, description, ingredients } = req.body

        const array = JSON.parse(ingredients);
        // const array1 = JSON.parse(mealItem);

        const item = new mealItemsModel({ trainer_id, mealItem, calary, description, ingredients: array })

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
        const page = parseInt({ active: true }, req.query.page || 1);
        const perPage = 7

        const mealItems = await mealItemsModel.find(req.query.search ? {
            active: true,
            $or:
                [
                    { mealItem: { $regex: req.query.search, $options: 'i' } },
                    { ingredients: { $regex: req.query.search, $options: 'i' } },
                    { calary: { $regex: req.query.search, $options: 'i' } }
                ]
        } : { active: true })
            .limit(perPage * 1)
            .skip((page - 1) * perPage)
            .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .exec();

        if (mealItems.length === 0) throw createError.NotFound("Not found mealItems..")

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

        const itemData = await mealItemsModel.findOne({ trainer_id }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
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

        const itemData = await mealItemsModel.findById(id).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
        if (!itemData) throw createError.NotFound("ENTER VALID ID..")
        if (itemData.active === false) throw createError.NotFound("item not found...")

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

        const itemData = await mealItemsModel.findByIdAndUpdate(id, { active: false }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })

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

        const itemData = await mealItemsModel.findByIdAndUpdate(id,
            { $set: { mealItem, calary, description, ingredients: array } })
            .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })

        if (!itemData) throw createError.NotFound("ENTER VALID ID..")
        if (itemData.active === false) throw createError.NotFound("item not found...")

        res.status(201).send({
            success: true,
            message: "mealItems update successfully",
            data: itemData
        })

    } catch (error) {
        next(error)
    }
}


