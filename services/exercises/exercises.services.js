const exercisesModel = require("./exercises.model")

module.exports = {
    findAllExercisesData: async (page,perPage,search) => {
        return new Promise(async (resolve) => {
            return resolve(
                await exercisesModel.find(
                    search ? {
                        active: true,
                        $or:
                            [
                                { exercisesName: { $regex: search, $options: 'i' } },
                                { description: { $regex: search, $options: 'i' } },
                                { videoLink: { $regex: search, $options: 'i' } }
                            ]
                    } : { active: true })
                        .limit(perPage * 1)
                        .skip((page - 1) * perPage)
                        .exec()
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
    findByExercisesName: async (exercisesName) => {
        return new Promise(async (resolve) => {
            return resolve(
                await exercisesModel.findOne(
                    { exercisesName },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateExercisesData: async (exercisesName, req_data) => {
        return new Promise(async (resolve) => {
            await exercisesModel.updateOne({ exercisesName }, { ...req_data }, { upsert: true });
            return resolve(
                await exercisesModel.find(
                    { exercisesName},
                    { createdAt: 0, updatedAt: 0, __v: 0 }
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