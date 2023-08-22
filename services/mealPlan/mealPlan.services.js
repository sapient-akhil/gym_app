const mealPlanModel = require("./exercises.model")

module.exports = {
    findAllMealPlanData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealPlanModel.find(
                    {},
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    findByMealPlanId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealPlanModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateMealPlanData: async (id) => {
        return new Promise(async (resolve) => {
            await mealPlanModel.updateOne({ _id: id }, { upsert: true });
            return resolve(
                await mealPlanModel.find(
                    { _id: id },
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
                    { createdAt: 0, updatedAt: 0, __v: 0 }
                )
            );
        });
    }
}