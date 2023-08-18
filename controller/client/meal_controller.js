const mealPlanModel = require("../../model/meal_plan_model")
const createError = require("http-errors")

exports.allMealPlan = async (req, res, next) => {
    try {
        const mealPlans = await mealPlanModel.find({ active: true })
            .populate("breakFast.mealItemsId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("morningSnack.mealItemsId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("lunch.mealItemsId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("eveningSnack.mealItemsId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("dinner.mealItemsId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })

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
            .populate("breakFast.mealItemsId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("morningSnack.mealItemsId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("lunch.mealItemsId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("eveningSnack.mealItemsId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("dinner.mealItemsId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
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



