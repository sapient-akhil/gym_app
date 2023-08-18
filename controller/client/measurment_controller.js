const measurmentModel = require("../../model/measurment_model")
const createError = require("http-errors")

exports.measurmentCreate = async (req, res, next) => {
    try {
        const { bodyPartId, date, unitValue } = req.body

        const measurment = new measurmentModel({ bodyPartId, date, unitValue })

        const measurmentData = await measurmentModel.create(measurment)

        res.status(201).send({
            success: true,
            message: "measurmentData is created...",
            data: measurmentData
        })
    } catch (error) {
        next(error)
    }
}

exports.allMeasurmentData = async (req, res, next) => {
    try {
        const measurmentData = await measurmentModel.find()
            .populate({
                path: "bodyPartId",
                populate: {
                    path: "unitId",
                    model: "unitModel",
                    select: { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
                },
                select: { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
            }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })

        res.status(200).send({
            success: true,
            message: "Measurment Data...",
            data: measurmentData
        })
    } catch (error) {
        next(error)
    }
}

exports.oneBodyPartData = async (req, res, next) => {
    try {
        const { id } = req.params

        const measurmentData = await measurmentModel.findById(id, { date: { $gte: startDate, $lt: endDate } })
            .populate({
                path: "bodyPartId",
                populate: {
                    path: "unitId",
                    model: "unitModel",
                    select: { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
                },
                select: { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
            }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
        if (!measurmentData) throw createError.NotFound("ENTER VALID ID..")
        if (measurmentData.active === false) throw createError.NotFound("measurmentData not found...")

        res.status(200).send({
            success: true,
            message: "Measurment Data...",
            data: measurmentData
        })
    } catch (error) {
        next(error)
    }
}

exports.particularBodyPart = async (req, res, next) => {
    try {
        const { bodyPartId } = req.params

        const measurmentData = await measurmentModel.find({ bodyPartId })
            .populate({
                path: "bodyPartId",
                populate: {
                    path: "unitId",
                    model: "unitModel",
                    select: { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
                },
                select: { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
            }).sort({ date: 1 }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })

        if (measurmentData.length === 0) throw createError.NotFound("ENTER VALID ID..")
        if (measurmentData.active === false) throw createError.NotFound("bodyPart not found...")

        res.status(200).send({
            success: true,
            message: "Measurment Data...",
            data: measurmentData
        })
    } catch (error) {
        next(error)
    }
}

exports.particularBodyPartByDate = async (req, res, next) => {
    try {
        const { bodyPartId } = req.params
        const { startDate, endDate } = req.body

        const measurmentData = await measurmentModel.find({ bodyPartId, date: { $gte: startDate, $lt: endDate } })
            .populate({
                path: "bodyPartId",
                populate: {
                    path: "unitId",
                    model: "unitModel",
                    select: { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
                },
                select: { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }
            }).sort({ date: 1 }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })

        if (measurmentData.length === 0) throw createError.NotFound("ENTER VALID ID..")
        if (measurmentData.active === false) throw createError.NotFound("bodyPart not found...")

        res.status(200).send({
            success: true,
            message: "Measurment Data...",
            data: measurmentData
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteMeasurmentData = async (req, res, next) => {
    try {

        const { id } = req.params

        const measurmentData = await measurmentModel.findByIdAndUpdate(id, { active: false }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
        if (!measurmentData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: " Measurment data deleted successfully",
            data: measurmentData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateMeasurmentData = async (req, res, next) => {
    try {

        const { id } = req.params

        const { bodyPartId, date, unitValue } = req.body

        const measurmentData = await measurmentModel.findByIdAndUpdate(id, { $set: { bodyPartId, date, unitValue } }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
        if (!measurmentData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "measurment data update successfully",
            data: measurmentData
        })

    } catch (error) {
        next(error)
    }
}
