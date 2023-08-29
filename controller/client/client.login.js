const bcrypt = require("bcrypt");
const createError = require("http-errors")
const {clientServices} = require("../../services/index")

module.exports = {
    clientLogin: async (req, res, next) => {

        try {
            const req_data = req.body;

            const client = await clientServices.findbyClientEmail( req_data.email );
            if (!client) throw createError.NotFound("email or password is wrong")

            // const hash = await bcrypt.hash(req_data.password, 10);
            // const passwordd = { password: hash }
            // req_data.password = passwordd.password

             const passwordMatch = await bcrypt.compare(req_data.password, client.password);
             console.log(passwordMatch)
             if (!passwordMatch) throw createError.NotFound("email or password is wrong");

            res.status(201).send({
                success: true,
                message: "client is login...",
                data: client,
            })
        } catch (error) {
            next(error)
        }
    }
}