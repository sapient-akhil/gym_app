const unitModel = require("./unit.model")

module.exports = {
    findAllUnitData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await unitModel.find(
                    {},
                    {createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0}
                )
            );
        });
    },
    existUnit: async (unit) => {
        return new Promise(async (resolve) => {
            return resolve(
                await unitModel.findOne(
                    { unit },
                    {createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0}
                )
            );
        });
    },
    findByUnitId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await unitModel.find(
                    { _id: id },
                    {createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0}
                )
            );
        });
    },
    updateUnitData: async (unit,req_data) => {
        return new Promise(async (resolve) => {
            await unitModel.updateOne({ unit }, {...req_data},{ upsert: true });
            return resolve(
                await unitModel.find(
                    { unit },
                    {createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0}
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
                    { createdAt: 0, updatedAt: 0, __v: 0,_id:0 }
                )
            );
        });
    },


}