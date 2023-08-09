const shoulderModel = require("../../model/shoulder_model")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")

exports.shoulderCreate = async (req, res, next) => {
    try {
        const { date, shoulder } = req.body

        const shoulderr = new shoulderModel({ date, shoulder })
        const shoulderData = await shoulderModel.create(shoulderr)

        res.status(201).send({
            success: true,
            message: "shoulderData is created...",
            data: shoulderData
        })
    } catch (error) {
        next(error)
    }
}

exports.getAllshoulderData = async (req, res, next) => {
    try {
        const getshoulderData = await shoulderModel.find({}, { date: 1, shoulder: 1, _id: 0 }).sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            message: "history of bodyWeight data...",
            data: getshoulderData
        })
    } catch (error) {
        next(error)
    }
}

exports.findshoulderByDateRang = async (req, res, next) => {
    try {

        const startDate = req.body.startDate;
        if (!startDate) throw createError.NotFound("enter the start date")
        const endDate = req.body.endDate;
        if (!endDate) throw createError.NotFound("enter the end date")

        const dateRange = await shoulderModel.find({ date: { $gte: startDate, $lt: endDate } }, { date: 1, shoulder: 1, _id: 0 }).sort({ createdAt: -1 })

        res.status(201).send({
            success: true,
            message: "Get selected waist by date",
            data: dateRange
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteshoulder = async (req, res, next) => {
    try {

        const { id } = req.params
        const shoulder = await params.validateAsync({ id });
        console.log(shoulder)

        const shoulderData = await shoulderModel.findByIdAndUpdate(id, { active: false })
        if (!shoulderData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "shoulderData delete successfully",
            data: shoulderData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateshoulder = async (req, res, next) => {
    try {

        const { id } = req.params

        const shoulderr = await params.validateAsync({ id });
        console.log(shoulderr)

        const { date, shoulder } = req.body

        const shoulderData = await shoulderModel.findByIdAndUpdate(id, { $set: { date, shoulder } })
        if (!shoulderData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "shoulderData update successfully",
            data: shoulderData
        })

    } catch (error) {
        next(error)
    }
}

