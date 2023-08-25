const workOutModel = require("./workOut.model")
const clientModel = require("../client/client_model")

module.exports = {
    findAllWorkOutData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await workOutModel.find()
                    .populate("client_id")
                    .populate("trainer_id")
                    .populate("workOut.exercises_id")
                    .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }))
        });
    },
    findByWorkOutId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await workOutModel.find(id)
                    .populate("client_id")
                    .populate("trainer_id")
                    .populate("workOut.exercises_id")
                    .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            );
        });
    },
    existClient: async (client_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientModel.findOne(
                    { _id: client_id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateWorkOutData: async (client_id, date, req_data) => {
        return new Promise(async (resolve) => {
            await workOutModel.updateOne({ client_id, dat }, { ...req_data }, { upsert: true });
            return resolve(
                await workOutModel.find(
                    { client_id },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, password: 0 }
                )
            );
        });
    },
    deleteWorkOutData: async (id) => {
        return new Promise(async (resolve) => {
            await workOutModel.updateOne({ _id: id }, { active: false });
            return resolve(
                await workOutModel.findOne(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0 }
                )
            );
        });
    }
}