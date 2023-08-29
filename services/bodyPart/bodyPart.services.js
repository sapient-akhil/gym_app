const bodyPartModel = require("./bodypart.model")
const unitModel = require("../unit/unit.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
    findAllBodyPartData: async (search, page, perPage) => {
        return new Promise(async (resolve) => {
            return resolve(
                await bodyPartModel.find(search ? { active: true, bodyPart: { $regex: search, $options: 'i' } } : { active: true })
                    .limit(perPage * 1)
                    .skip((page - 1) * perPage)
                    .select(projectionFields)
                    .populate("unitId", projectionFields)
            )
        });
    },
    findByBodyPartId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await bodyPartModel.findOne({ _id, active: true }, projectionFields).populate("unitId", projectionFields)
            );
        });
    },
    findByUnitId: async (unitId) => {
        return new Promise(async (resolve) => {
            return resolve(
                await unitModel.findOne(
                    { _id: unitId, active: true },
                    projectionFields
                )
            );
        });
    },
    createUpdateBodyPartData: async (unitId, bodyPart, req_data) => {
        return new Promise(async (resolve) => {
            await bodyPartModel.updateOne({ unitId, bodyPart }, { ...req_data }, { upsert: true });
            return resolve(
                await bodyPartModel.find(
                    { unitId, bodyPart },
                    projectionFields
                )
            );
        });
    },
    deleteBodyPartData: async (_id) => {
        return new Promise(async (resolve) => {
            await bodyPartModel.updateOne({ _id }, { active: false });
            return resolve(
                await bodyPartModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}