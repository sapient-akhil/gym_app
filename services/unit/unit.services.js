const unitModel = require("./unit.model")

module.exports = {
    findAllUnitData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await unitModel.find(
                    {},
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    findByUnitId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await unitModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateUnitData: async (id) => {
        return new Promise(async (resolve) => {
            await unitModel.updateOne({ _id: id }, { upsert: true });
            return resolve(
                await unitModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, password: 0 }
                )
            );
        });
    },
    deleteUnitData: async (id) => {
        return new Promise(async (resolve) => {
            await unitModel.updateOne({ _id: id }, { active: false });
            return resolve(
                await unitModel.findOne(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0 }
                )
            );
        });
    },


}