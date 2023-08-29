const mealItemModel = require("./mealItems.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

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
                    } : { active: true }, projectionFields)
                    .limit(perPage * 1)
                    .skip((page - 1) * perPage)
                    .populate("trainer_id", projectionFields)
                    .exec()
            );
        });
    },
    findByMealItemId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealItemModel.find({ _id: id, active: true }, projectionFields)
                    .populate("trainer_id", projectionFields)
                    .select(projectionFields)
            );
        });
    },
    findByMealItemsName: async (mealItem) => {
        return new Promise(async (resolve) => {
            return resolve(
                await mealItemModel.findOne(
                    { mealItem, active: true },
                    projectionFields
                )
            );
        });
    },
    createUpdateMealItemData: async (mealItem, req_data) => {
        return new Promise(async (resolve) => {
            await mealItemModel.updateOne({ mealItem }, { ...req_data }, { upsert: true });
            return resolve(
                await mealItemModel.find(
                    { mealItem },
                    projectionFields
                )
            );
        });
    },
    deleteMealItemData: async (_id) => {
        return new Promise(async (resolve) => {
            await mealItemModel.updateOne({ _id }, { active: false });
            return resolve(
                await mealItemModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}