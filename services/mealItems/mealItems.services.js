const mealItemModel = require("./mealItems.model")

module.exports = {
    findAllMealItemData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealItemModel.find(
                    {},
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    findByMealItemId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealItemModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateMealItemData: async (id) => {
        return new Promise(async (resolve) => {
            await mealItemModel.updateOne({ _id: id }, { upsert: true });
            return resolve(
                await mealItemModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, password: 0 }
                )
            );
        });
    },
    deleteMealItemData: async (id) => {
        return new Promise(async (resolve) => {
            await mealItemModel.updateOne({ _id: id }, { active: false });
            return resolve(
                await mealItemModel.findOne(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0 }
                )
            );
        });
    }
}