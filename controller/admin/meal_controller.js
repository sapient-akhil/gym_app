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
    },
    createUpdateMealPlan: async (req, res, next) => {
        try {
            const req_data = req.body;

            const existClientId = await mealPlanServices.existClientId(req_data.clientId)
            if (existClientId) {
                throw createError.Conflict("existClientId already exists");
            }

            // Check for duplicate mealItemsId within each meal category

            const checkDuplicates = mealCategory => {
                const mealItemsIdsSet = new Set();
                for (const item of mealCategory) {
                    if (mealItemsIdsSet.has(item.mealItemsId.toString())) {
                        throw createError.Conflict("same mealItemsId found in mealPlan category");
                    }
                    mealItemsIdsSet.add(item.mealItemsId.toString());
                }
            };

            const array = await JSON.parse(req_data.breakFast)
            const array1 = await JSON.parse(req_data.morningSnack)
            const array2 = await JSON.parse(req_data.lunch)
            const array3 = await JSON.parse(req_data.eveningSnack)
            const array4 = await JSON.parse(req_data.dinner)

            checkDuplicates(array);
            checkDuplicates(array1);
            checkDuplicates(array2);
            checkDuplicates(array3);
            checkDuplicates(array4);

            req_data.breakFast = array
            req_data.morningSnack = array1
            req_data.lunch = array2
            req_data.eveningSnack = array3
            req_data.dinner = array4

            const mealPlan = await mealPlanServices.createUpdateMealPlanData(req_data.clientId, req_data);

            res.status(201).send({
                success: true,
                message: "mealPlan is loaded...",
                data: mealPlan
            })
        } catch (error) {
            next(error)
        }
    },
    deleteMealPlan: async (req, res, next) => {
        try {

            const { id } = req.params

            const mealPlan = await mealPlanServices.deleteMealPlanData(id)

            if (!mealPlan) throw createError.NotFound("The mealPlan with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "mealPlan delete successfully",
                data: mealPlan
            })
        } catch (error) {
            next(error)
        }
    },
}




