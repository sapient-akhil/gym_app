const workOutModel = require("../../services/workOut/workOut.model")
const createError = require("http-errors")
const { workOutServices } = require("../../services/index")
const path = require("path")

module.exports = {

    workOutCreate: async (req, res, next) => {
        try {
            const req_data = req.body

            const array = await JSON.parse(req_data.workOut);
            req_data.workOut = array

            const existClient = await workOutServices.existClient(req_data.client_id, req_data.date)
            if (!existClient) {
                throw createError.Conflict("this client is not exist");
            }
            const workOutData = await workOutServices.updateWorkOutData(req_data.client_id, req_data.date, req_data)

            res.status(201).send({
                success: true,
                message: "workOut is created...",
                data: workOutData
            })
        } catch (error) {
            next(error)
        }
    },

    allWorkOut: async (req, res, next) => {
        try {

            const allWorkOut = await workOutServices.findAllWorkOutData()

            res.status(201).send({
                success: true,
                message: "get all allWorkOut",
                data: allWorkOut
            })
        } catch (error) {
            next(error)
        }
    },

    oneWorkOut: async (req, res, next) => {
        try {

            const { id } = req.params

            const workOutData = await workOutServices.findByWorkOutId(id)

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
    deleteWorkOut: async (req, res, next) => {
        try {

            const { id } = req.params

            const workOutData = await workOutServices.deleteWorkOutData(id)
            if (!workOutData) throw createError.NotFound("ENTER VALID ID..")

            res.status(201).send({
                success: true,
                message: "workout delete successfully",
                data: workOutData
            })
        } catch (error) {
            next(error)
        }
    }
}

