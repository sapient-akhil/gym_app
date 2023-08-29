const createError = require("http-errors")
const { workOutServices } = require("../../services/index")

module.exports = {

    createUpdateWorkOut: async (req, res, next) => {
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
            const page = parseInt(req.query.page || 1);
            const perPage = 3
            const search = req.query.search

            const allWorkOut = await workOutServices.findAllWorkOutData(page, perPage, search)

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
            if (!workOutData) throw createError.NotFound("The workOutData with the provided ID could not be found. Please ensure the ID is correct and try again")

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
            if (!workOutData) throw createError.NotFound("The workOutData with the provided ID could not be found. Please ensure the ID is correct and try again")

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

