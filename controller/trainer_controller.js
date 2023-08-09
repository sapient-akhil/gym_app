const trainerModel = require("../model/trainer_model");
const createError = require("http-errors");
const { signAccessTokenforTrainer } = require("../helper/token")

exports.trainerLogin = async (req, res, next) => {
    try {
        const { email, mobilenumber } = req.body;
        console.log("email password", req.body)

        const user = await trainerModel.findOne({ "contactdetails.email": email });
        if (!user) throw createError.NotFound("mobilenumber or email is wrong")

        const existMobileNumber = await trainerModel.findOne({ "contactdetails.mobilenumber": mobilenumber })
        if (!existMobileNumber) throw createError.NotFound("mobilenumber or email is wrong")

        const accessToken = await signAccessTokenforTrainer(user);

        res.status(201).send({
            success: true,
            message: "trainer is login...",
            data: user,
            accessToken
        })

    } catch (error) {
        next(error)
    }
}