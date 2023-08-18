const workOutModel = require("../../model/workOut_model")
const createError = require("http-errors")

exports.allWorkOut = async (req, res, next) => {
    try {
        // const startDate = req.body.startDate;
        // const endDate = req.body.endDate;

        const allWorkOut = await workOutModel.find({ active: true })
            .populate("workOut.client_id",{ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("workOut.trainer_id",{ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("workOut.exercises_id",{ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })

        res.status(201).send({
            success: true,
            message: "get all allWorkOut",
            data: allWorkOut
        })
    } catch (error) {
        next(error)
    }
}

exports.oneWorkOut = async (req, res, next) => {
    try {

        const { id } = req.params

        const workOutData = await workOutModel.findById(id)
            .populate("workOut.client_id",{ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("workOut.trainer_id",{ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            .populate("workOut.exercises_id",{ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
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
}


