const workOutModel = require("../../services/workOut/workOut.model")
const createError = require("http-errors")
const path = require("path")

module.exports ={

    workOutCreate : async (req, res, next) => {
        try {
            const { workOut, date } = req.body
    
            const array = await JSON.parse(workOut);
    
            const workOutt = new workOutModel({  workOut: array, date })
    
            const workOutData = await workOutModel.create(workOutt)
    
            res.status(201).send({
                success: true,
                message: "workOut is created...",
                data: workOutData
            })
        } catch (error) {
            next(error)
        }
    },
    
    allWorkOut : async (req, res, next) => {
        try {
            // const startDate = req.body.startDate;
            // const endDate = req.body.endDate;
    
            const allWorkOut = await workOutModel.find({ active: true })
                .populate("workOut.client_id")
                .populate("workOut.trainer_id")
                .populate("workOut.exercises_id")
                .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
    
            res.status(201).send({
                success: true,
                message: "get all allWorkOut",
                data: allWorkOut
            })
        } catch (error) {
            next(error)
        }
    },
    
    oneWorkOut : async (req, res, next) => {
        try {
    
            const { id } = req.params
    
            const workOutData = await workOutModel.findById(id)
                .populate("workOut.client_id")
                .populate("workOut.trainer_id")
                .populate("workOut.exercises_id")
                .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            if (!workOutData) throw createError.NotFound("ENTER VALID ID..")
            if (workOutData.active === false) throw createError.NotFound("workOut not found...")
    
            res.status(201).send({
                success: true,
                message: "get one workout",
                data: workOutData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteWorkOut : async (req, res, next) => {
        try {
    
            const { id } = req.params
    
            const workOutData = await workOutModel.findByIdAndUpdate(id, { active: false }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            if (!workOutData) throw createError.NotFound("ENTER VALID ID..")
    
            res.status(201).send({
                success: true,
                message: "workout delete successfully",
                data: workOutData
            })
        } catch (error) {
            next(error)
        }
    },
    
    updateWorkOut : async (req, res, next) => {
        try {
    
            const { id } = req.params
    
            const { workOut, date } = req.body
    
            const array = JSON.parse(workOut)
    
            const workOutData = await workOutModel.findByIdAndUpdate(id,
                { $set: { workOut: array, date } })
                .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            if (!workOutData) throw createError.NotFound("ENTER VALID ID..")
    
            res.status(201).send({
                success: true,
                message: "workout update successfully",
                data: workOutData
            })
        } catch (error) {
            next(error)
        }
    }
}

