const exercisesModel = require("./exercises.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
    findAllExercisesData: async (page, perPage, search) => {
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
                    } : { active: true },  projectionFields )
                    .limit(perPage * 1)
                    .skip((page - 1) * perPage)
                    .exec()
            );
        });
    },
    findByExercisesId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await exercisesModel.find(
                    { _id, active: true },
                     projectionFields 
                )
            );
        });
    },
    findByExercisesName: async (exercisesName) => {
        return new Promise(async (resolve) => {
            return resolve(
                await exercisesModel.findOne(
                    { exercisesName, active: true },
                     projectionFields 
                )
            );
        });
    },
    updateExercisesData: async (exercisesName, req_data) => {
        return new Promise(async (resolve) => {
            await exercisesModel.updateOne({ exercisesName }, { ...req_data }, { upsert: true });
            return resolve(
                await exercisesModel.find(
                    { exercisesName },
                     projectionFields 
                )
            );
        });
    },
    deleteExercisesData: async (_id) => {
        return new Promise(async (resolve) => {
            await exercisesModel.updateOne({ _id }, { active: false });
            return resolve(
                await exercisesModel.findOne(
                    { _id },
                     projectionFields 
                )
            );
        });
    }
}