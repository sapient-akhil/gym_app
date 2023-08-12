const workOutModel = require("../../model/workOut_model")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")
const path = require("path")

exports.workOutCreate = async (req, res, next) => {
    try {
        const { exercises_id, workOutName, time, reps, set, volume, date } = req.body
        const array = JSON.parse(exercises_id);

        const workOut = new workOutModel({ exercises_id: array, workOutName, time, reps, set, volume, date })

        const workOutData = await workOutModel.create(workOut)

        res.status(201).send({
            success: true,
            message: "workOut is created...",
            data: workOutData
        })
    } catch (error) {
        next(error)
    }
}

exports.allWorkOut = async (req, res, next) => {
    try {
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;

        const allWorkOut = await workOutModel.find({ active: true, date: { $gte: startDate, $lt: endDate } }).populate("exercises_id")

        res.status(201).send({
            success: true,
            message: "get all allWorkOut",
            data: allWorkOut
        })

    } catch (error) {

        next(error)
    }
}

exports.oneWorkOut = async (req, res, next) => {
    try {

        const { id } = req.params

        const workOutData = await workOutModel.findById(id).populate("exercises_id")

        res.status(201).send({
            success: true,
            message: "get one workout",
            data: workOutData
        })

    } catch (error) {
        next(error)
    }
}
exports.deleteWorkOut = async (req, res, next) => {
    try {

        const { id } = req.params

        const workOutData = await workOutModel.findByIdAndUpdate(id, { active: false })
        if (!workOutData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "workout delete successfully",
            data: workOutData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateWorkOut = async (req, res, next) => {
    try {

        const { id } = req.params

        const result = await params.validateAsync({ id });
        console.log(result)

        const { exercises_id, workOutName, time, reps, set, volume, date } = req.body

        const array = JSON.parse(exercises_id)

        const workOutData = await workOutModel.findByIdAndUpdate(id, { $set: { exercises_id: array, workOutName, time, reps, set, volume, date } })
        if (!workOutData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "workout update successfully",
            data: workOutData
        })

    } catch (error) {
        next(error)
    }
}
