const mealPlanModel = require("../../services/mealPlan/mealPlan.model")
const mealItemsModel = require("../../services/exercises/exercises.model")
const createError = require("http-errors")
const { mealPlanServices } = require("../../services/index")

module.exports = {
    mealPlanCreate: async (req, res, next) => {
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

            const existClient = await mealPlanServices.existClientId(req_data.clientId)
            if (!existClient) {
                throw createError.Conflict("no any client found with this id");
            }
            const savedMealPlan = await mealPlanServices.updateMealPlanData(req_data.clientId, req_data);

            res.status(201).send({
                success: true,
                message: "mealPlan is created...",
                data: savedMealPlan
            })
        } catch (error) {
            next(error)
        }
    },

    allMealPlan: async (req, res, next) => {
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
    },
    deleteMealPlan: async (req, res, next) => {
        try {

            const { id } = req.params

            const mealPlan = await mealPlanServices.deleteMealPlanData(id, { active: false })

            if (!mealPlan) throw createError.NotFound("ENTER VALID ID..")

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




