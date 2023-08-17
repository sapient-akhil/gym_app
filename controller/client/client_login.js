const clientModel = require("../../model/client_model");
const bcrypt = require("bcrypt");
const createError = require("http-errors")

exports.clientLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const client = await clientModel.findOne({ email });
        if (!client) throw createError.NotFound("email id does not exists")

        const passwordMatch = await bcrypt.compare(password, client.password);
        if (!passwordMatch) throw createError.NotFound("email or password is wrong");

        // const accessToken = await signAccessTokenforUser(user);

        res.status(201).send({
            success: true,
            message: "client is login...",
            data: client,
            // accessToken,
        })
    } catch (error) {
        next(error)
    }
}