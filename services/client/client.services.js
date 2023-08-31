const clientModel = require("./client.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
    findbyClientEmail: async (email) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientModel.findOne(
                    { email, active: true },
                    projectionFields
                )
            )
        });
    },
    findbyClientMobileNumber: async (mobilenumber) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientModel.findOne(
                    { mobilenumber, active: true },
                    projectionFields
                )
            );
        });
    },
    emailMobilnumber: async (email, mobilenumber) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientModel.findOne(
                    { email, mobilenumber, active: true },
                    projectionFields
                )
            );
        });
    },
    findAllClientData: async (search, page, perPage) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientModel.find(
                    search ? {
                        active: true,
                        $or:
                            [
                                { name: { $regex: search, $options: 'i' } },
                                { email: { $regex: search, $options: 'i' } },
                                { address: { $regex: search, $options: 'i' } }
                            ]
                    } : { active: true })
                    .limit(perPage * 1)
                    .skip((page - 1) * perPage)
                    .select(projectionFields)
                    .populate("trainer_id", projectionFields)
                    .exec()
            );
        });
    },
    findByClientId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientModel.find({ _id, active: true }, projectionFields)
                    .populate("trainer_id", projectionFields)
                    .select(projectionFields)
            );
        });
    },
    createUpdateClientData: async (email, mobilenumber, req_data) => {
        return new Promise(async (resolve) => {
            await clientModel.updateOne({ email, mobilenumber }, { ...req_data }, { upsert: true });
            return resolve(
                await clientModel.find(
                    { email, mobilenumber },
                    projectionFields
                )
            );
        });
    },
    deleteClientData: async (_id) => {
        return new Promise(async (resolve) => {
            await clientModel.updateOne({ _id }, { active: false });
            return resolve(
                await clientModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    }
}