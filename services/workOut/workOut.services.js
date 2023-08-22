const workOutModel = require("./unit.model")

module.exports = {
    findAllWorkOutData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await workOutModel.find(
                    {},
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    findByWorkOutId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await workOutModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateWorkOutData: async (id) => {
        return new Promise(async (resolve) => {
            await workOutModel.updateOne({ _id: id }, { upsert: true });
            return resolve(
                await workOutModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, password: 0 }
                )
            );
        });
    },
    deleteWorkOutData: async (id) => {
        return new Promise(async (resolve) => {
            await workOutModel.updateOne({ _id: id }, { active: false });
            return resolve(
                await workOutModel.findOne(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0 }
                )
            );
        });
    }
}