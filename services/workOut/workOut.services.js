const workOutModel = require("./workout.model")
const clientModel = require("../client/client.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
    findAllWorkOutData: async (search, perPage, page) => {
        return new Promise(async (resolve) => {
            return resolve(
                await workOutModel.find(search ? {
                    active: true,
                    $or:
                        [
                            { "workOut.workOutName": { $regex: search, $options: 'i' } },
                            { "workOut.volume": { $regex: search, $options: 'i' } },
                        ]
                } : { active: true }, data)
                    .limit(perPage * 1)
                    .skip((page - 1) * perPage)
                    .populate("client_id", projectionFields)
                    .populate("trainer_id", projectionFields)
                    .populate("workOut.exercises_id", projectionFields)
                    .select(data))
        });
    },
    findByWorkOutId: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await workOutModel.findOne({ _id: id, active: true })
                    .populate("client_id", projectionFields)
                    .populate("trainer_id", projectionFields)
                    .populate("workOut.exercises_id", projectionFields)
                    .select(projectionFields)
            );
        });
    },
    existClient: async (client_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await clientModel.findOne(
                    { _id: client_id, active: true },
                    projectionFields
                )
            );
        });
    },
    updateWorkOutData: async (client_id, date, req_data) => {
        return new Promise(async (resolve) => {
            await workOutModel.updateOne({ client_id, date }, { ...req_data }, { upsert: true });
            return resolve(
                await workOutModel.find(
                    { client_id },
                    projectionFields
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
                    projectionFields
                )
            );
        });
    }
}