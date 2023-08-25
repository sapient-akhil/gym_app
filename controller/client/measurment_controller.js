const measurmentModel = require("../../services/measurment/measurment.model")
const createError = require("http-errors")
const { measurmentServices } = require("../../services/index")

module.exports = {
    measurmentCreate: async (req, res, next) => {
        try {
            const req_data = req.body

            const existBodyPartId = await measurmentServices.findBybodyPartId(req_data.bodyPartId)
            if (!existBodyPartId) {
                throw createError.Conflict("no any bodyPart with this bodyPartId");
            }
            const measurmentData = await measurmentServices.updateMeasurmentData(req_data.bodyPartId, req_data.unitValue, req_data)
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

    particularBodyPart: async (req, res, next) => {
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
    },

    particularBodyPartByDate: async (req, res, next) => {
        try {
            const { bodyPartId } = req.params
            const req_data = req.body

            const measurmentData = await measurmentServices.
                findByParticularBodyPartByDate(bodyPartId, req_data.startDate, req_data.endDate)

            if (measurmentData.length === 0) throw createError.NotFound("ENTER VALID ID..")
            if (measurmentData.active === false) throw createError.NotFound("bodyPart not found...")

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
            if (!measurmentData) throw createError.NotFound("ENTER VALID ID..")

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


