const createError = require("http-errors")
const { workOutServices } = require("../../services/index")


module.exports = {
    allWorkOut: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const perPage = 3
            const search = req.query.search
            const allWorkOut = await workOutServices.findAllWorkOutData(search,perPage,page)

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
    }
}


