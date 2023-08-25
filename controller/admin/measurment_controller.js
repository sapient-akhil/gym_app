const measurmentModel = require("../../services/measurment/measurment.model")
const createError = require("http-errors")
const { measurmentServices } = require("../../services/index")

module.exports = {
    allMeasurmentData: async (req, res, next) => {
        try {
            const measurmentData = await measurmentServices.findAllMeasurmentData()
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
                
            if (!measurmentData.length) throw createError.NotFound("ENTER VALID ID..")
            if (measurmentData.active === false) throw createError.NotFound("measurmentData not found...")

            res.status(200).send({
                success: true,
                message: "Measurment Data...",
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
            if (!measurmentData.length) throw createError.NotFound("ENTER VALID ID..")
            if (measurmentData.active === false) throw createError.NotFound("bodyPart not found...")

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

