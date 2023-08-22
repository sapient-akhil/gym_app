const measurmentModel = require("./exercises.model")

module.exports = {
    findAllMeasurmentData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await measurmentModel.find(
                    {},
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    findByMeasurmentId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await measurmentModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateMeasurmentData: async (id) => {
        return new Promise(async (resolve) => {
            await measurmentModel.updateOne({ _id: id }, { upsert: true });
            return resolve(
                await measurmentModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, password: 0 }
                )
            );
        });
    },
    deleteMeasurmentData: async (id) => {
        return new Promise(async (resolve) => {
            await measurmentModel.updateOne({ _id: id }, { active: false });
            return resolve(
                await measurmentModel.findOne(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0 }
                )
            );
        });
    }
}