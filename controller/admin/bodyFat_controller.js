const bodyFatModel = require("../../model/bodyFat_model")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")

exports.bodyFatCreate = async (req, res, next) => {
    try {
        const { date, bodyFat } = req.body

        const bodyFatt = new bodyFatModel({ date, bodyFat })
        const bodyFatData = await bodyFatModel.create(bodyFatt)

        res.status(201).send({
            success: true,
            message: "bodyWeight is created...",
            data: bodyFatData
        })
    } catch (error) {
        next(error)
    }
}

exports.getAllBodyFat = async (req, res, next) => {
    try {
        const getAllBodyFat = await bodyFatModel.find({}, { date: 1, bodyFat: 1, _id: 0 }).sort({createdAt:-1})

        res.status(200).send({
            success: true,
            message: "history of bodyFat data...",
            data: getAllBodyFat
        })
    } catch (error) {
        next(error)
    }
}

exports.findFatByDateRang = async (req, res, next) => {
    try {

        const startDate = req.body.startDate;
        if (!startDate) throw createError.NotFound("enter the start date")
        const endDate = req.body.endDate;
        if (!endDate) throw createError.NotFound("enter the end date")

        const dateRange = await bodyFatModel.find({ date: { $gte: startDate, $lt: endDate } }, { date: 1, bodyFat: 1, _id: 0 }).sort({ createdAt: -1 })

        res.status(201).send({
            success: true,
            message: "Get selected bodyFatData by date",
            data: dateRange
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteBodyFat = async (req, res, next) => {
    try {

        const { id } = req.params
        const bodyFat = await params.validateAsync({ id });
        console.log(bodyFat)

        const bodyFatData = await bodyFatModel.findByIdAndUpdate(id, { active: false })
        if (!bodyFatData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "bodyFatData delete successfully",
            data: bodyFatData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateBodyFat = async (req, res, next) => {
    try {

        const { id } = req.params

        const bodyFatt = await params.validateAsync({ id });
        console.log(bodyFatt)

        const { date, bodyFat } = req.body

        const bodyFatData = await bodyFatModel.findByIdAndUpdate(id, { $set: { date, bodyFat } })
        if (!bodyFatData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "bodyFatData update successfully",
            data: bodyFatData
        })

    } catch (error) {
        next(error)
    }
}