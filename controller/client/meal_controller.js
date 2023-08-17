const mealPlanModel = require("../../model/meal_plan_model")
const createError = require("http-errors")

exports.allMealPlan = async (req, res, next) => {
    try {
        const mealPlans = await mealPlanModel.find({ active: true })
            .populate("breakFast.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
            .populate("morningSnack.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
            .populate("lunch.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
            .populate("eveningSnack.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
            .populate("dinner.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })

        res.status(201).send({
            success: true,
            message: "get all mealPlans",
            data: mealPlans
        })
    } catch (error) {
        next(error)
    }
}

exports.oneMealplan = async (req, res, next) => {
    try {

        const { id } = req.params

        const mealPlan = await mealPlanModel.findById(id)
        if (!mealPlan) throw createError.NotFound("ENTER VALID ID..")
        if (mealPlan.active === false) throw createError.NotFound("mealPlan not found...")

        res.status(201).send({
            success: true,
            message: "get one mealPlan",
            data: mealPlan
        })
    } catch (error) {
        next(error)
    }
}



