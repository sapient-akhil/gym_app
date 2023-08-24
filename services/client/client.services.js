const clientModel = require("./client_model")

module.exports = {
    findbyClientEmail: async (email) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientModel.findOne(
                    { email },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            )
        });
    },
    findbyClientMobileNumber: async (mobilenumber) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientModel.findOne(
                    { mobilenumber },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },

    findAllClientData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientModel.find(
                    {},
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    findByClientId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientModel.find({_id:id})
                    .populate("trainer_id", ({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }))
                    .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            );
        });
    },
    updateClientData: async (email, mobilenumber, req_data) => {
        return new Promise(async (resolve) => {
            await clientModel.updateOne({ email, mobilenumber }, { ...req_data }, { upsert: true });
            return resolve(
                await clientModel.find(
                    { email, mobilenumber },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, password: 0 }
                )
            );
        });
    },
    deleteClientData: async (id) => {
        return new Promise(async (resolve) => {
            await clientModel.updateOne({ _id: id }, { active: false });
            return resolve(
                await clientModel.findOne(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0 }
                )
            );
        });
    },


}