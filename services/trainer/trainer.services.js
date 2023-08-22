const trainerModel = require("./trainer.model")

module.exports = {
    findbyTrainerEmail: async (email) => {
        return new Promise(async (resolve) => {
            return resolve(
                await trainerModel.findOne(
                    { "contactdetails.email": email },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },

    findbyTrainerMobileNumber: async (mobilenumber) => {
        return new Promise(async (resolve) => {
            return resolve(
                await trainerModel.findOne(
                    { "contactdetails.mobilenumber": mobilenumber },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    findAllTrainerData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await trainerModel.find(
                    {},
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    findByTrainerId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await trainerModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateTrainerData: async (id) => {
        return new Promise(async (resolve) => {
            await trainerModel.updateOne({ _id: id }, { upsert: true });
            return resolve(
                await trainerModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, password: 0 }
                )
            );
        });
    },
    deleteTrainerData: async (id) => {
        return new Promise(async (resolve) => {
            await trainerModel.updateOne({ _id: id }, { active: false });
            return resolve(
                await trainerModel.findOne(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0 }
                )
            );
        });
    },


}