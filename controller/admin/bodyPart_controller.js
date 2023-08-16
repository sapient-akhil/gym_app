const bodyPartModel = require("../../model/bodyPart_model")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")

exports.bodyPartCreate = async (req, res, next) => {
    try {
        const { unitId, bodyPart } = req.body

        const bodyPartCreate = new bodyPartModel({ unitId, bodyPart })

        const bodyPartData = await bodyPartModel.create(bodyPartCreate)
        
        res.status(201).send({
            success: true,
            message: "bodyPart is created...",
            data: bodyPartData
        })
    } catch (error) {
        next(error)
    }
}

exports.allBodyPart = async (req, res, next) => {
    try {
        const getBodyPartData = await bodyPartModel.find({active:true}).populate("unitId")

        res.status(200).send({
            success: true,
            message: "get BodyPart Data...",
            data: getBodyPartData
        })
    } catch (error) {
        next(error)
    }
}

exports.oneBodyPart = async (req, res, next) => {
    try {

        const { id } = req.params

        const bodyPartData = await bodyPartModel.findById(id).populate("unitId")
        if(!bodyPartData) throw createError.NotFound("ENTER VALID ID...")

        res.status(201).send({
            success: true,
            message: "get one bodyPartData",
            data: bodyPartData
        })

    } catch (error) {
        next(error)
    }
}

exports.deleteBodyPart = async (req, res, next) => {
    try {

        const { id } = req.params
        
        const bodyPartData = await bodyPartModel.findByIdAndUpdate(id, { active: false })

        if (!bodyPartData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "bodyPart Data delete successfully",
            data: bodyPartData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateBodyPart = async (req, res, next) => {
    try {

        const { id } = req.params

        const { unitId, bodyPart } = req.body

        const bodyPartData = await bodyPartModel.findByIdAndUpdate(id, { $set: { unitId, bodyPart } })

        if (!bodyPartData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "bodyPartData update successfully",
            data: bodyPartData
        })

    } catch (error) {
        next(error)
    }
}