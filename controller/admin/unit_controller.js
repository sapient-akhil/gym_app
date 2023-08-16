const unitModel = require("../../model/unit_model")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")

exports.unitCreate = async (req, res, next) => {
    try {
        const { unit } = req.body

        const unitCreate = new unitModel({ unit })

        const existUnit = await unitModel.findOne({ unit })
        if (existUnit) throw createError.NotFound("This unit is already exist")

        const unitData = await unitModel.create(unitCreate)

        res.status(201).send({
            success: true,
            message: "unitData is created...",
            data: unitData
        })
    } catch (error) {
        next(error)
    }
}

exports.allUnit = async (req, res, next) => {
    try {

        const allUnit = await unitModel.find()

        res.status(201).send({
            success: true,
            message: "get all Unit",
            data: allUnit
        })

    } catch (error) {

        next(error)
    }
}

exports.oneUnit = async (req, res, next) => {
    try {

        const { id } = req.params

        const unitData = await unitModel.findById(id)
        if (!unitData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "get one unitMData",
            data: unitData
        })

    } catch (error) {
        next(error)
    }
}
exports.deleteUnit = async (req, res, next) => {
    try {

        const { id } = req.params
        
        const unitData = await unitModel.findByIdAndUpdate(id, { active: false })

        if (!unitData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "unitData delete successfully",
            data: unitData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateUnit = async (req, res, next) => {
    try {

        const { id } = req.params

        const { unit } = req.body

        const unitData = await unitModel.findByIdAndUpdate(id, { $set: { unit } })

        if (!unitData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "unitData update successfully",
            data: unitData
        })

    } catch (error) {
        next(error)
    }
}