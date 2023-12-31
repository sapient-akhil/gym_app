const createError = require("http-errors")
const { bodyPartServices } = require("../../services/index")

module.exports = {
    allBodyPart: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const perPage = 3
            const search = req.query.search
            const getBodyPartData = await bodyPartServices.findAllBodyPartData(search, page, perPage)

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
             if (!bodyPartData) throw createError.NotFound("The bodyPartData with the provided ID could not be found. Please ensure the ID is correct and try again")

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
            if (!existUnitId) {
                throw createError.Conflict("no any unit with this unitId");
            }
            const bodyPartData = await bodyPartServices.createUpdateBodyPartData(req_data.unitId, req_data.bodyPart, req_data)

            res.status(201).send({
                success: true,
                message: "bodyPart is loaded...",
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
            if (!bodyPartData) throw createError.NotFound("The bodyPartData with the provided ID could not be found. Please ensure the ID is correct and try again")

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

