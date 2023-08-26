const workOutModel = require("../../services/workOut/workOut.model")
const createError = require("http-errors")


module.exports = {
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

            if (!workOutData) throw createError.NotFound("The workOutData with the provided ID could not be found. Please ensure the ID is correct and try again")
            if (workOutData.active === false) throw createError.NotFound("workOut not found...")

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


