const measurmentModel = require("../../model/measurment_model")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")

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

exports.getMeasurmentData = async (req, res, next) => {
    try {
        const measurmentData = await measurmentModel.find()
            .populate({
                path: "bodyPartId",
                populate: {
                    path: "unitId",
                    model: "unitModel",
                    select: { _id: 0, active: 0, __v: 0 }
                },
                select: { _id: 0, active: 0, __v: 0 }
            })

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
        const bodyPartId = req.params

        const measurmentData = await measurmentModel.find(bodyPartId)
            .populate({
                path: "bodyPartId",
                populate: {
                    path: "unitId",
                    model: "unitModel",
                    select: { _id: 0, active: 0, __v: 0 }
                },
                select: { _id: 0, active: 0, __v: 0 }
            })

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
       
        const measurmentData = await measurmentModel.findByIdAndUpdate(id, { active: false })

        if (!measurmentData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: " Measurment Data deleted successfully",
            data: itemData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateMeasurmentData = async (req, res, next) => {
    try {

        const { id } = req.params

        const { bodyPartId, date, unitValue } = req.body

        const measurmentData = await mealItemsModel.findByIdAndUpdate(id, { $set: { bodyPartId, date, unitValue } })

        if (!measurmentData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "mealItems update successfully",
            data: measurmentData
        })

    } catch (error) {
        next(error)
    }
}
