const unitModel = require("./unit.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
    findAllUnitData: async (search, page, perPage) => {
        return new Promise(async (resolve) => {
            return resolve(
                await unitModel.find(search ? { active: true, unit: { $regex: search, $options: 'i' }, } : { active: true })
                    .limit(perPage * 1)
                    .skip((page - 1) * perPage)
                    .select(projectionFields)
                    .exec()
            );
        });
    },
    existUnit: async (unit) => {
        return new Promise(async (resolve) => {
            return resolve(
                await unitModel.findOne(
                    { unit, active: true },
                    projectionFields
                )
            );
        });
    },
    findByUnitId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await unitModel.find(
                    { _id, active: true },
                    projectionFields
                )
            );
        });
    },
    createUpdateUnitData: async (unit, req_data) => {
        return new Promise(async (resolve) => {
            await unitModel.updateOne({ unit }, { ...req_data }, { upsert: true });
            return resolve(
                await unitModel.find(
                    { unit },
                    projectionFields
                )
            );
        });
    },
    deleteUnitData: async (_id) => {
        return new Promise(async (resolve) => {
            await unitModel.updateOne({ _id }, { active: false });
            return resolve(
                await unitModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}