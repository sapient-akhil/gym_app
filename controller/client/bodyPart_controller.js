const bodyPartModel = require("../../services/bodyPart/bodyPart.model")
const createError = require("http-errors")
const { bodyPartServices } = require("../../services/index")

module.exports = {
    allBodyPart: async (req, res, next) => {
        try {
            const getBodyPartData = await bodyPartServices.findAllBodyPartData()

            res.status(200).send({
                success: true,
                message: "get BodyPart Data...",
                data: getBodyPartData
            })
        } catch (error) {
            next(error)
        }
    },
    oneBodyPart: async (req, res, next) => {
        try {

            const { id } = req.params

            const bodyPartData = await bodyPartServices.findByBodyPartId(id)
             if (!bodyPartData.length) throw createError.NotFound("The bodyPartData with the provided ID could not be found. Please ensure the ID is correct and try again")
            if (bodyPartData.active === false) throw createError.NotFound("bodyPart not found...")

            res.status(201).send({
                success: true,
                message: "get one bodyPartData",
                data: bodyPartData
            })
        } catch (error) {
            next(error)
        }
    },
    createUpdateBodyPart: async (req, res, next) => {
        try {
            const req_data = req.body

            const existUnitId = await bodyPartServices.findByUnitId(req_data.unitId)
            if (!existUnitId.length) {
                throw createError.Conflict("no any unit with this unitId");
            }
            const bodyPartData = await bodyPartServices.updateBodyPartData(req_data.unitId, req_data.bodyPart, req_data)

            res.status(201).send({
                success: true,
                message: "bodyPart is created...",
                data: bodyPartData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteBodyPart: async (req, res, next) => {
        try {

            const { id } = req.params

            const bodyPartData = await bodyPartServices.deleteBodyPartData(id)
            if (!bodyPartData.length) throw createError.NotFound("The bodyPartData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "bodyPart Data delete successfully",
                data: bodyPartData
            })
        } catch (error) {
            next(error)
        }
    }
}

