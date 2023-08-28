const mealPlanModel = require("./mealPlan.model")
const clientmodel = require("../client/client_model")

module.exports = {
    findAllMealPlanData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealPlanModel.find({active: true})
                    .populate("clientId", { active: 0, createdAt: 0, updatedAt: 0, __v: 0, _id: 0 })
                    .populate("breakFast.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("morningSnack.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("lunch.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("eveningSnack.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .populate("dinner.mealItemsId", { mealItem: 1, calary: 1, description: 1, ingredients: 1, _id: 0 })
                    .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            );
        });
    },
    existClientId: async (clientId) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientmodel.findOne(
                    { clientId, active: true },
                    {createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0})
            );
        });
    },
    existClient: async (clientId) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientmodel.findOne(
                    { clientId, active: true },
                    {createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0}
                )
            );
        });
    },
    findByMealPlanId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealPlanModel.find({ _id: id, active: true },{createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0})
                    .populate("clientId", { active: 0, createdAt: 0, updatedAt: 0, __v: 0, _id: 0 })
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
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, password: 0 }
                )
            );
        });
    },
    deleteMealPlanData: async (id) => {
        return new Promise(async (resolve) => {
            await mealPlanModel.updateOne({ _id: id }, { active: false });
            return resolve(
                await mealPlanModel.findOne(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0,_id:0 }
                )
            );
        });
    }
}