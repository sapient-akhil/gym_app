const clientModel = require("./client_model")

module.exports = {
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
                await clientModel.find(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateClientData: async (id) => {
        return new Promise(async (resolve) => {
            await clientModel.updateOne({ _id: id }, { upsert: true });
            return resolve(
                await clientModel.find(
                    { _id: id },
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