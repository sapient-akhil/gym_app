const measurmentModel = require("./measurment.model")
const bodyPartModel = require("../bodyPart/bodypart.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
    findAllMeasurmentData: async (page, perPage, search) => {
        return new Promise(async (resolve) => {
            return resolve(
                await measurmentModel.find(search ? { active: true, unitValue: { $eq: search } } : { active: true })
                    .limit(perPage * 1)
                    .skip((page - 1) * perPage)
                    .populate({
                        path: "bodyPartId",
                        populate: {
                            path: "unitId",
                            model: "unitModel",
                            select: projectionFields
                        },
                        select: projectionFields
                    })
            );
        });
    },
    oneMeasurmentData: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await measurmentModel.find({ _id, active: true }, projectionFields)
                    .populate({
                        path: "bodyPartId",
                        populate: {
                            path: "unitId",
                            model: "unitModel",
                            select: projectionFields
                        },
                        select: projectionFields
                    })
            );
        });
    },
    findByParticularBodyPart: async (bodyPartId) => {
        return new Promise(async (resolve) => {
            return resolve(
                await measurmentModel.find(bodyPartId)
                    .populate({
                        path: "bodyPartId",
                        populate: {
                            path: "unitId",
                            model: "unitModel",
                            select: projectionFields
                        },
                        select: projectionFields
                    }).sort({ date: 1 }).select(projectionFields)
            );
        });
    },
    findByParticularBodyPartByDate: async (bodyPartId, startDate, endDate) => {
        return new Promise(async (resolve) => {
            return resolve(
                await measurmentModel.find({ bodyPartId, date: { $gte: startDate, $lt: endDate } }, { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: true })
                    .populate({
                        path: "bodyPartId",
                        populate: {
                            path: "unitId",
                            model: "unitModel",
                            select: projectionFields
                        },
                        select: projectionFields
                    }).sort({ date: 1 }).select(projectionFields)

            );
        });
    },
    findBybodyPartId: async (bodyPartId) => {
        return new Promise(async (resolve) => {
            return resolve(
                await bodyPartModel.findOne(
                    { _id: bodyPartId, active: true },
                    { select: projectionFields }
                )
            );
        });
    },
    createUpdateMeasurmentData: async (bodyPartId, unitValue, req_data) => {
        return new Promise(async (resolve) => {
            await measurmentModel.updateOne({ bodyPartId, unitValue }, { ...req_data }, { upsert: true });
            return resolve(
                await measurmentModel.find(
                    { bodyPartId, unitValue },
                    { select: projectionFields }
                )
            );
        });
    },
    deleteMeasurmentData: async (_id) => {
        return new Promise(async (resolve) => {
            await measurmentModel.updateOne({ _id }, { active: false });
            return resolve(
                await measurmentModel.findOne(
                    { _id },
                    { createdAt: 0, updatedAt: 0, __v: 0, __id: 0 }
                )
            );
        });
    }
}