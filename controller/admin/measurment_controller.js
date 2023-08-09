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

        // {}, { date: 1, waist: 1, _id: 0 }).sort({ createdAt: -1 }

        res.status(200).send({
            success: true,
            message: "Measurment Data...",
            data: measurmentData
        })
    } catch (error) {
        next(error)
    }
}