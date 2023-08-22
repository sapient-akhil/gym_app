const exercisesModel = require("./exercises.model")

module.exports = {
    findAllExercisesData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await exercisesModel.find(
                    {},
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    findByExercisesId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await exercisesModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateExercisesData: async (id) => {
        return new Promise(async (resolve) => {
            await exercisesModel.updateOne({ _id: id }, { upsert: true });
            return resolve(
                await exercisesModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, password: 0 }
                )
            );
        });
    },
    deleteExercisesData: async (id) => {
        return new Promise(async (resolve) => {
            await exercisesModel.updateOne({ _id: id }, { active: false });
            return resolve(
                await exercisesModel.findOne(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0 }
                )
            );
        });
    }
}