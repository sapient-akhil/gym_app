const mealPlanModel = require("../../model/meal_plan_model")
const mealItemsModel = require("../../model/meal_items_model")
const createError = require("http-errors")

module.exports = {
    mealPlanCreate : async (req, res, next) => {
        try {
            const { clientId, breakFast, morningSnack, lunch, eveningSnack, dinner, date } = req.body;
    
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
    
            const array = await JSON.parse(breakFast)
            const array1 = await JSON.parse(morningSnack)
            const array2 = await JSON.parse(lunch)
            const array3 = await JSON.parse(eveningSnack)
            const array4 = await JSON.parse(dinner)
    
            checkDuplicates(array);
            checkDuplicates(array1);
            checkDuplicates(array2);
            checkDuplicates(array3);
            checkDuplicates(array4);
    
            const newMealPlan = new mealPlanModel({
                clientId,
                breakFast:array,
                morningSnack:array1,
                lunch:array2,
                eveningSnack:array3,
                dinner:array4,
                date
            });
    
            const savedMealPlan = await mealPlanModel.create(newMealPlan);
    
            res.status(201).send({
                success: true,
                message: "mealPlan is created...",
                data: savedMealPlan
            })
        } catch (error) {
            next(error)
        }
    },
    
    allMealPlan : async (req, res, next) => {
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
    },
    
    oneMealplan : async (req, res, next) => {
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
    },
    deleteMealPlan : async (req, res, next) => {
        try {
    
            const { id } = req.params
    
            const mealPlan = await mealPlanModel.findByIdAndUpdate(id, { active: false })
    
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
    
    updateMealPlan : async (req, res, next) => {
        try {
    
            const { id } = req.params
    
            const { breakFast, morningSnack, lunch, eveningSnack, dinner, date } = req.body
    
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
    
            const array = await JSON.parse(breakFast)
            const array1 = await JSON.parse(morningSnack)
            const array2 = await JSON.parse(lunch)
            const array3 = await JSON.parse(eveningSnack)
            const array4 = await JSON.parse(dinner)
    
            checkDuplicates(array);
            checkDuplicates(array1);
            checkDuplicates(array2);
            checkDuplicates(array3);
            checkDuplicates(array4);
    
            // const newMealPlan = new mealPlanModel({
            //     clientId,
            //     breakFast:array,
            //     morningSnack:array1,
            //     lunch:array2,
            //     eveningSnack:array3,
            //     dinner:array4,
            //     date
            // });
    
            const mealPlan = await mealPlanModel.findByIdAndUpdate(id, { $set: { breakFast:array, morningSnack:array1, lunch:array2, eveningSnack:array3, dinner:array4, date } })
    
            if (!mealPlan) throw createError.NotFound("ENTER VALID ID..")
    
            res.status(201).send({
                success: true,
                message: "mealPlan update successfully",
                data: mealPlan
            })
        } catch (error) {
            next(error)
        }
    }
}




