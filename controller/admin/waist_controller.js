const waistModel = require("../../model/waist_controller")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")

exports.waistCreate = async (req, res, next) => {
    try {
        const { date, waist } = req.body

        const waistt = new waistModel({ date, waist })
        const waistData = await waistModel.create(waistt)

        res.status(201).send({
            success: true,
            message: "waistData is created...",
            data: waistData
        })
    } catch (error) {
        next(error)
    }
}

exports.getAllWaistData = async (req, res, next) => {
    try {
        const getWaistData = await waistModel.find({}, { date: 1, waist: 1, _id: 0 }).sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            message: "history of bodyWeight data...",
            data: getWaistData
        })
    } catch (error) {
        next(error)
    }
}

exports.findWaistByDateRang = async (req, res, next) => {
    try {

        const startDate = req.body.startDate;
        if (!startDate) throw createError.NotFound("enter the start date")
        const endDate = req.body.endDate;
        if (!endDate) throw createError.NotFound("enter the end date")

        const dateRange = await waistModel.find({ date: { $gte: startDate, $lt: endDate } }, { date: 1, waist: 1, _id: 0 }).sort({ createdAt: -1 })

        res.status(201).send({
            success: true,
            message: "Get selected waist by date",
            data: dateRange
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteWaistPlan = async (req, res, next) => {
    try {

        const { id } = req.params
        const waist = await params.validateAsync({ id });
        console.log(waist)

        const waistData = await waistModel.findByIdAndUpdate(id, { active: false })
        if (!waistData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "waistData delete successfully",
            data: waistData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateWaistPlan = async (req, res, next) => {
    try {

        const { id } = req.params

        const result = await params.validateAsync({ id });
        console.log(result)

        const { date, waist } = req.body

        const waistData = await waistModel.findByIdAndUpdate(id, { $set: { date, waist } })
        if (!waistData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "waistData update successfully",
            data: waistData
        })

    } catch (error) {
        next(error)
    }
}

