const bodyPartModel = require("./bodyPart.model")
const unitModel = require("../unit/unit.model")

module.exports = {
    findAllBodyPartData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await bodyPartModel.find({ active: true },{createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0}).populate("unitId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            );
        });
    },
    findByBodyPartId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await bodyPartModel.findOne({ _id: id },{createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0}).populate("unitId", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            );
        });
    },
    findByUnitId: async (unitId) => {
        return new Promise(async (resolve) => {
            return resolve(
                await unitModel.findOne(
                    { _id: unitId },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
                )
            );
        });
    },
    updateBodyPartData: async (unitId, bodyPart, req_data) => {
        return new Promise(async (resolve) => {
            await bodyPartModel.updateOne({ unitId, bodyPart }, { ...req_data }, { upsert: true });
            return resolve(
                await bodyPartModel.find(
                    { unitId, bodyPart },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
                )
            );
        });
    },
    deleteBodyPartData: async (id) => {
        return new Promise(async (resolve) => {
            await bodyPartModel.updateOne({ _id: id }, { active: false });
            return resolve(
                await bodyPartModel.findOne(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    }
}