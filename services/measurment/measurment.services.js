const measurmentModel = require("./measurment.model")
const bodyPartModel = require("../bodyPart/bodyPart.model")

module.exports = {
    findAllMeasurmentData: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await measurmentModel.find()
                    .populate({
                        path: "bodyPartId",
                        populate: {
                            path: "unitId",
                            model: "unitModel",
                            select: { _id: 0, active: 0, __v: 0 }
                        },
                        select: { _id: 0, active: 0, __v: 0 }
                    })
            );
        });
    },
    oneMeasurmentData: async (id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await measurmentModel.find({ _id: id })
                    .populate({
                        path: "bodyPartId",
                        populate: {
                            path: "unitId",
                            model: "unitModel",
                            select: { _id: 0, active: 0, __v: 0 }
                        },
                        select: { _id: 0, active: 0, __v: 0 }
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
                            select: { _id: 0, active: 0, __v: 0 }
                        },
                        select: { _id: 0, active: 0, __v: 0 }
                    }).sort({ date: 1 })
            );
        });
    },
    findByParticularBodyPartByDate: async (bodyPartId,startDate,endDate) => {
        return new Promise(async (resolve) => {
            return resolve(
                await measurmentModel.find({ bodyPartId, date: { $gte: startDate, $lt: endDate } })
                    .populate({
                        path: "bodyPartId",
                        populate: {
                            path: "unitId",
                            model: "unitModel",
                            select: { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
                        },
                        select: { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
                    }).sort({ date: 1 }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })

            );
        });
    },
    findBybodyPartId: async (bodyPartId) => {
        return new Promise(async (resolve) => {
            return resolve(
                await bodyPartModel.findOne(
                    { _id: bodyPartId },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    updateMeasurmentData: async (bodyPartId, unitValue, req_data) => {
        return new Promise(async (resolve) => {
            await measurmentModel.updateOne({ bodyPartId, unitValue }, { ...req_data }, { upsert: true });
            return resolve(
                await measurmentModel.find(
                    { bodyPartId, unitValue },
                    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
                )
            );
        });
    },
    deleteMeasurmentData: async (id) => {
        return new Promise(async (resolve) => {
            await measurmentModel.updateOne({ _id: id }, { active: false });
            return resolve(
                await measurmentModel.findOne(
                    { _id: id },
                    { createdAt: 0, updatedAt: 0, __v: 0 }
                )
            );
        });
    }
}