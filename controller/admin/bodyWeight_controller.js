const bodyWeightModel = require("../../model/bodyWeight_model")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")

exports.bodyWeightCreate = async (req, res, next) => {
    try {
        const { date, bodyWeight } = req.body

        const weight = new bodyWeightModel({ date, bodyWeight })
        const weightData = await bodyWeightModel.create(weight)

        res.status(201).send({
            success: true,
            message: "bodyWeight is created...",
            data: weightData
        })
    } catch (error) {
        next(error)
    }
}

exports.getAllBodyWeight = async (req, res, next) => {
    try {
        const getbody = await bodyWeightModel.find({}, { date: 1, bodyWeight: 1, _id: 0 })

        res.status(200).send({
            success: true,
            message: "history of bodyWeight data...",
            data: getbody
        })
    } catch (error) {
        next(error)
    }
}

exports.findWeightByDateRang = async (req, res, next) => {
    try {

        const startDate = req.body.startDate;
        if (!startDate) throw createError.NotFound("enter the start date")
        const endDate = req.body.endDate;
        if (!endDate) throw createError.NotFound("enter the end date")

        const dateRange = await bodyWeightModel.find({ date: { $gte: startDate, $lt: endDate } }, { date: 1, bodyWeight: 1, _id: 0 }).sort({ createdAt: -1 })

        res.status(201).send({
            success: true,
            message: "Get selected weight by date",
            data: dateRange
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteBodyWeight = async (req, res, next) => {
    try {

        const { id } = req.params
        const weight = await params.validateAsync({ id });
        console.log(weight)

        const weightData = await bodyWeightModel.findByIdAndUpdate(id, { active: false })
        if (!weightData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "waistData delete successfully",
            data: weightData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateBodyWeight = async (req, res, next) => {
    try {

        const { id } = req.params

        const weight = await params.validateAsync({ id });
        console.log(weight)

        const { date, bodyWeight } = req.body

        const weightData = await bodyWeightModel.findByIdAndUpdate(id, { $set: { date, bodyWeight } })
        if (!weightData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "waistData update successfully",
            data: weightData
        })

    } catch (error) {
        next(error)
    }
}