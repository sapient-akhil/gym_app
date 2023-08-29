const mealPlanModel = require("./mealPlan.model")
const clientmodel = require("../client/client.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
    findAllMealPlanData: async (page, perPage, search) => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealPlanModel.find(search ? {
                    active: true,
                    $or:
                        [
                            { "breakFast.unit": { $regex: search, $options: 'i' } },
                            { "morningSnack.unit": { $regex: search, $options: 'i' } },
                            { "lunch.unit": { $regex: search, $options: 'i' } },
                            { "eveningSnack.unit": { $regex: search, $options: 'i' } },
                            { "dinner.unit": { $regex: search, $options: 'i' } }
                        ]
                } : { active: true }, projectionFields)
                    .limit(perPage * 1)
                    .skip((page - 1) * perPage)
                    .populate("clientId", projectionFields)
                    .populate("breakFast.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("morningSnack.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("lunch.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("eveningSnack.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("dinner.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .select(projectionFields)
            );
        });
    },
    existClientId: async (clientId) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientmodel.findOne(
                    { clientId, active: true },
                    projectionFields)
            );
        });
    },
    existClient: async (clientId) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientmodel.findOne(
                    { clientId, active: true },
                    projectionFields
                )
            );
        });
    },
    findByMealPlanId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealPlanModel.find({ _id, active: true }, projectionFields)
                    .populate("clientId", projectionFields)
                    .populate("breakFast.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("morningSnack.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("lunch.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("eveningSnack.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("dinner.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })

            );
        });
    },
    createUpdateMealPlanData: async (clientId, req_data) => {
        return new Promise(async (resolve) => {
            await mealPlanModel.updateOne({ clientId }, { ...req_data }, { upsert: true });
            return resolve(
                await mealPlanModel.find(
                    { clientId },
                    projectionFields
                )
            );
        });
    },
    deleteMealPlanData: async (_id) => {
        return new Promise(async (resolve) => {
            await mealPlanModel.updateOne({ _id }, { active: false });
            return resolve(
                await mealPlanModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}