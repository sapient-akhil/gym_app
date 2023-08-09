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
            message: "waistData is created...",
            data: bodyPartData
        })
    } catch (error) {
        next(error)
    }
}

exports.getBodyPart = async (req, res, next) => {
    try {
        const getBodyPartData = await bodyPartModel.find().populate("unitId")

        // {}, { date: 1, waist: 1, _id: 0 }).sort({ createdAt: -1 }

        res.status(200).send({
            success: true,
            message: "get BodyPart Data...",
            data: getBodyPartData
        })
    } catch (error) {
        next(error)
    }
}