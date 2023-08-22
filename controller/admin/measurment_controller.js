const measurmentModel = require("../../model/measurment_model")
const createError = require("http-errors")

module.exports = {
    allMeasurmentData : async (req, res, next) => {
        try {
            const measurmentData = await measurmentModel.find()
                .populate({
                    path: "bodyPartId",
                    populate: {
                        path: "unitId",
                        model: "unitModel",
                        select: { _id: 0, active: 0, __v: 0 }
                    },
                    select: { _id: 0, active: 0, __v: 0 }
                })
    
            res.status(200).send({
                success: true,
                message: "Measurment Data...",
                data: measurmentData
            })
        } catch (error) {
            next(error)
        }
    },
    
    oneBodyPartData : async (req, res, next) => {
        try {
            const { id } = req.params
    
            const measurmentData = await measurmentModel.findById(id)
                .populate({
                    path: "bodyPartId",
                    populate: {
                        path: "unitId",
                        model: "unitModel",
                        select: { _id: 0, active: 0, __v: 0 }
                    },
                    select: { _id: 0, active: 0, __v: 0 }
                })
            if (!measurmentData) throw createError.NotFound("ENTER VALID ID..")
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
    
    bodyPartData : async (req, res, next) => {
        try {
            const { bodyPartId } = req.params
    
            const measurmentData = await measurmentModel.find({ bodyPartId })
                .populate({
                    path: "bodyPartId",
                    populate: {
                        path: "unitId",
                        model: "unitModel",
                        select: { _id: 0, active: 0, __v: 0 }
                    },
                    select: { _id: 0, active: 0, __v: 0 }
                }).sort({ date: 1 })
    
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
    }
}

