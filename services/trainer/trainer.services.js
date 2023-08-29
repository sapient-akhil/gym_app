const trainerModel = require("./trainer.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
    findbyTrainerEmail: async (email) => {
        return new Promise(async (resolve) => {
            return resolve(
                await trainerModel.findOne(
                    { "contactdetails.email": email, active: true },
                    projectionFields
                )
            )
        });
    },

    findbyTrainerMobileNumber: async (mobilenumber) => {
        return new Promise(async (resolve) => {
            return resolve(
                await trainerModel.findOne(
                    { "contactdetails.mobilenumber": mobilenumber, active: true },
                    projectionFields
                )
            );
        });
    },
    findAllTrainerData: async (page, perPage, search) => {
        return new Promise(async (resolve) => {
            return resolve(
                await trainerModel.find(
                    search ? {
                        active: true,
                        $or:
                            [
                                { name: { $regex: search, $options: 'i' } },
                                { "contactdetails.email": { $regex: search, $options: 'i' } },
                                { "contactdetails.mobilenumber": { $regex: search, $options: 'i' } }
                            ]
                    } : { active: true }, projectionFields)
                    .limit(perPage * 1)
                    .skip((page - 1) * perPage)
                    .exec()
            )
        });
    },
    emailmobilnumber: async (email, mobilenumber) => {
        return new Promise(async (resolve) => {
            return resolve(
                await trainerModel.findOne(
                    { "contactdetails.email": email, "contactdetails.mobilenumber": mobilenumber, active: true },
                    projectionFields
                )
            );
        });
    },
    findByTrainerId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await trainerModel.findOne(
                    { _id, active: true },
                    projectionFields
                )
            );
        });
    },
    createUpdateTrainerData: async (email, mobilenumber, req_data) => {
        return new Promise(async (resolve) => {
            await trainerModel.updateOne({ "contactdetails.email": email, "contactdetails.mobilenumber": mobilenumber }, { ...req_data }, { upsert: true });
            return resolve(
                await trainerModel.find(
                    { "contactdetails.email": email, "contactdetails.mobilenumber": mobilenumber },
                    projectionFields
                )
            );
        });
    },
    deleteTrainerData: async (_id) => {
        return new Promise(async (resolve) => {
            await trainerModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await trainerModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    findSuperAdminExistOrNOt: async () => {
        return new Promise(async (resolve) => {
            return resolve(await trainerModel.countDocuments({ role: "superadmin" }));
        });
    },
    createUpdateSuperAdmin: async (req_data) => {
        return new Promise(async (resolve) => {
            return resolve(await trainerModel.insertMany({ role: "superadmin", ...req_data }));
        });
    }
}