const unitModel = require("../../services/unit/unit.model")
const createError = require("http-errors")
const {unitServices} = require("../../services/index")

module.exports={
    allUnit : async (req, res, next) => {
        try {
    
            const allUnit = await unitServices.findAllUnitData()
    
            res.status(201).send({
                success: true,
                message: "get all Unit",
                data: allUnit
            })
        } catch (error) {
            next(error)
        }
    },
    oneUnit : async (req, res, next) => {
        try {
    
            const { id } = req.params
    
            const unitData = await unitServices.findByUnitId(id)
            if (!unitData.length) throw createError.NotFound("The unitData with the provided ID could not be found. Please ensure the ID is correct and try again")
            if (unitData.active === false) throw createError.NotFound("unit not found...")
    
            res.status(201).send({
                success: true,
                message: "get one unitMData",
                data: unitData
            })
        } catch (error) {
            next(error)
        }
    },
    createUpdateUnit : async (req, res, next) => {
        try {
            const req_data = req.body
    
            const existUnit = await unitServices.existUnit(req_data.unit)
            if (existUnit) throw createError.NotFound("This unit is already exist")
    
            const unitData = await unitServices.updateUnitData(req_data.unit,req_data)
    
            res.status(201).send({
                success: true,
                message: "unitData is created...",
                data: unitData
            })
        } catch (error) {
            next(error)
        }
    },
    
    deleteUnit : async (req, res, next) => {
        try {
    
            const { id } = req.params
    
            const unitData = await unitServices.deleteUnitData(id)
    
            if (!unitData) throw createError.NotFound("The unitData with the provided ID could not be found. Please ensure the ID is correct and try again")
    
            res.status(201).send({
                success: true,
                message: "unitData delete successfully",
                data: unitData
            })
        } catch (error) {
            next(error)
        }
    }
}
