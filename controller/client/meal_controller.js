const createError = require("http-errors")
const { mealPlanServices } = require("../../services/index")

module.exports = {
    allMealPlan: async (req, res, next) => {
        try {
            const mealPlans = await mealPlanServices.findAllMealPlanData()
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
            if (!mealPlan.length) throw createError.NotFound("The mealPlan with the provided ID could not be found. Please ensure the ID is correct and try again")

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




