const mealItemModel = require("./mealItems.model")

module.exports = {
    findAllMealItemData: async (page, perPage, search) => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealItemModel.find(
                    search ? {
                        active: true,
                        $or:
                            [
                                { mealItem: { $regex: search, $options: 'i' } },
                                { ingredients: { $regex: search, $options: 'i' } },
                                { calary: { $regex: search, $options: 'i' } }
                            ]
                    } : { active: true }, { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
                    .limit(perPage * 1)
                    .skip((page - 1) * perPage)
                    .populate("trainer_id", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
                    .exec()
            );
        });
    },
    findByMealItemId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealItemModel.find({ _id: id }, { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
                    .populate("trainer_id", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
                    .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            );
        });
    },
    findByMealItemsName: async (mealItem) => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealItemModel.findOne(
                    { mealItem },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
                )
            );
        });
    },
    updateMealItemData: async (mealItem, req_data) => {
        return new Promise(async (resolve) => {
            await mealItemModel.updateOne({ mealItem }, { ...req_data }, { upsert: true });
            return resolve(
                await mealItemModel.find(
                    { mealItem },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
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
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    }
}