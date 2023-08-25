const mealItemsModel = require("../../services/mealItems/mealItems.model")
const createError = require("http-errors")
const { mealItemsServices } = require("../../services/index")

module.exports = {
    mealItemCreate: async (req, res, next) => {
        try {
            const req_data = req.body

            const array = JSON.parse(req_data.ingredients);
            req_data.ingredients = array

            const existMealItems = await mealItemsServices.findByMealItemsName(req_data.mealItem)
            if (existMealItems) {
                throw createError.Conflict("existMealItems already exists");
            }
            const item = await mealItemsServices.updateMealItemData(req_data.mealItem, req_data)

            res.status(201).send({
                success: true,
                message: "mealItems is created...",
                data: item
            })
        } catch (error) {
            next(error)
        }
    },

    allMealItem: async (req, res, next) => {
        try {
            const page = parseInt({ active: true }, req.query.page || 1);
            const perPage = 7
            const search = req.query.search

            const mealItems = await mealItemsServices.findAllMealItemData(page, perPage, search)
            if (mealItems.length === 0) throw createError.NotFound("Not found mealItems..")

            res.status(201).send({
                success: true,
                message: "get mealItems",
                data: mealItems
            })
        } catch (error) {
            next(error)
        }
    },

    trainerMealItems: async (req, res, next) => {
        try {

            const { trainer_id } = req.params

            const itemData = await mealItemsModel.findOne({ trainer_id })
            if (!itemData) throw createError.NotFound("ENTER VALID ID..")

            res.status(201).send({
                success: true,
                message: "get all mealItems",
                data: itemData
            })
        } catch (error) {
            next(error)
        }
    },

    oneMealItems: async (req, res, next) => {
        try {

            const { id } = req.params

            const itemData = await mealItemsServices.findByMealItemId(id)
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
    },
    deleteMealItems: async (req, res, next) => {
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
}



