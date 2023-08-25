const bodyPartModel = require("../../services/bodyPart/bodyPart.model")
const createError = require("http-errors")
const { bodyPartServices } = require("../../services/index")

module.exports = {
    bodyPartCreate: async (req, res, next) => {
        try {
            const req_data = req.body

            // const bodyPartCreate = new bodyPartModel({ unitId, bodyPart })
            const existUnitId = await bodyPartServices.findByUnitId(req_data.unitId)
            if (!existUnitId) {
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
             if (!bodyPartData) throw createError.NotFound("ENTER VALID ID...")
            if (bodyPartData.active === false) throw createError.NotFound("bodyPart not found...")

            console.log(bodyPartData)
            res.status(201).send({
                success: true,
                message: "get one bodyPartData",
                data: bodyPartData
            })
        } catch (error) {
            next(error)
        }
    },

    deleteBodyPart: async (req, res, next) => {
        try {

            const { id } = req.params

            const bodyPartData = await bodyPartServices.deleteBodyPartData(id, { active: false })

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
}

