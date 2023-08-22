const bodyPartModel = require("./bodyPart.model")

module.exports = {
    findAllBodyPartData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await bodyPartModel.find(
                    {},
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    findByBodyPartId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await bodyPartModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateBodyPartData: async (id) => {
        return new Promise(async (resolve) => {
            await bodyPartModel.updateOne({ _id: id }, { upsert: true });
            return resolve(
                await bodyPartModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, password: 0 }
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
                    { createdAt: 0, updatedAt: 0, __v: 0 }
                )
            );
        });
    },


}