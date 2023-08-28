const createError = require("http-errors")
const { measurmentServices } = require("../../services/index")

module.exports = {
    allMeasurmentData: async (req, res, next) => {
        try {
            const measurmentData = await measurmentServices.findAllMeasurmentData()
            res.status(200).send({
                success: true,
                message: "all Measurment Data...",
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
                message: "one Measurment Data...",
                data: measurmentData
            })
        } catch (error) {
            next(error)
        }
    },
    particularBodyPartData: async (req, res, next) => {
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
    }
}

