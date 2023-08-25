const mealPlanModel = require("../../services/mealPlan/mealPlan.model")
const createError = require("http-errors")
const { mealPlanServices } = require("../../services/index")

module.exports = {
    allMealPlan: async (req, res, next) => {
        try {
            const mealPlans = await mealPlanServices.findAllMealPlanData({ active: true })

            res.status(201).send({
                success: true,
                message: "get all mealPlans",
                data: mealPlans
            })
        } catch (error) {
            next(error)
        }
    },

    oneMealplan: async (req, res, next) => {
        try {
            const { id } = req.params

            const mealPlan = await mealPlanServices.findByMealPlanId(id)
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
}




