const createError = require("http-errors")
const { measurmentServices } = require("../../services/index")

module.exports = {
    allMeasurmentData: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const perPage = 3
            const search = req.query.search
            const measurmentData = await measurmentServices.findAllMeasurmentData(page, perPage, search)
            res.status(200).send({
                success: true,
                message: "Measurment Data...",
                data: measurmentData
            })
        } catch (error) {
            next(error)
        }
    },
    oneMeasurmentData: async (req, res, next) => {
        try {
            const { id } = req.params

            const measurmentData = await measurmentServices.oneMeasurmentData(id)
            if (!measurmentData.length) throw createError.NotFound("The measurmentData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(200).send({
                success: true,
                message: "Measurment Data...",
                data: measurmentData
            })
        } catch (error) {
            next(error)
        }
    },
    createUpdatemeasurment: async (req, res, next) => {
        try {
            const req_data = req.body

            const existBodyPartId = await measurmentServices.findBybodyPartId(req_data.bodyPartId)
            if (!existBodyPartId) {
                throw createError.Conflict("no any bodyPart with this bodyPartId");
            }
            const measurmentData = await measurmentServices.createUpdateMeasurmentData(req_data.bodyPartId, req_data.unitValue, req_data)
            console.log("measurmentData", measurmentData)
            res.status(201).send({
                success: true,
                message: "measurmentData is created...",
                data: measurmentData
            })
        } catch (error) {
            next(error)
        }
    },
    particularBodyPart: async (req, res, next) => {
        try {
            const { bodyPartId } = req.params

            const measurmentData = await measurmentServices.findByParticularBodyPart({ bodyPartId })
            if (!measurmentData.length) throw createError.NotFound("The bodyPartId with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(200).send({
                success: true,
                message: "Measurment Data...",
                data: measurmentData
            })
        } catch (error) {
            next(error)
        }
    },
    particularBodyPartByDate: async (req, res, next) => {
        try {
            const { bodyPartId } = req.params
            const req_data = req.body

            const measurmentData = await measurmentServices.findByParticularBodyPartByDate(bodyPartId, req_data.startDate, req_data.endDate)

            if (!measurmentData.length) throw createError.NotFound("The measurmentData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(200).send({
                success: true,
                message: "Measurment Data...",
                data: measurmentData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteMeasurmentData: async (req, res, next) => {
        try {
            const { id } = req.params

            const measurmentData = await measurmentServices.deleteMeasurmentData(id)
            if (!measurmentData) throw createError.NotFound("The measurmentData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: " Measurment data deleted successfully",
                data: measurmentData
            })
        } catch (error) {
            next(error)
        }
    }
}


