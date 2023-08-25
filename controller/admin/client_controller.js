const clientModel = require("../../services/trainer/trainer.services");
const bcrypt = require("bcrypt");
const createError = require("http-errors")
const { clientServices } = require("../../services/index");
const trainer_controller = require("./trainer_controller");

module.exports = {
    createClient: async (req, res, next) => {
        try {
            const req_data = req.body

            const existingClient = await clientServices.emailMobilnumber(req_data.email, req_data.mobilenumber)

            if (!existingClient) {
                const existEmail = await clientServices.findbyClientEmail(req_data.email);
                if (existEmail) {
                    throw createError.Conflict("Email already exists");
                }
                const existMobileNumber = await clientServices.findbyClientMobileNumber(req_data.mobilenumber);
                if (existMobileNumber) {
                    throw createError.Conflict("mobileNumber already exists");
                }
            }

            const payload = req.payload;
            const id = payload.aud[0]._id

            const hash = await bcrypt.hash(req_data.password, 10);
            const passwordd = { password: hash }
            req_data.password = passwordd.password

            const idd = { trainer_id: id }
            req_data.trainer_id = idd.trainer_id

            const clientData = await clientServices.updateClientData(req_data.email, req_data.mobilenumber, req_data)
            console.log(clientData)
            res.status(201).send({
                success: true,
                message: "client is created...",
                data: clientData
            })
        } catch (error) {
            next(error)
        }
    },

    allClient: async (req, res, next) => {

        try {
            const page = parseInt(req.query.page || 1);
            const perPage = 3
            const search = req.query.search
            
            const client = await clientServices.findAllClientData(search,page,perPage)
            if (client.length === 0) throw createError.NotFound("No clients found")

            res.status(201).send({
                success: true,
                message: "get all client",
                data: client
            })
        } catch (error) {
            next(error)
        }
    },

    oneClient: async (req, res, next) => {
        try {

            const { id } = req.params

            const clientData = await clientServices.findByClientId(id)

            if (!clientData.length) throw createError.NotFound("ENTER VALID ID..")
            if (clientData.active === false) throw createError.NotFound("client not found...")

            res.status(201).send({
                success: true,
                message: "get one Client",
                data: clientData
            })
        } catch (error) {
            next(error)
        }
    },

    deleteClient: async (req, res, next) => {
        try {

            const { id } = req.params

            const client = await clientServices.deleteClientData(id)
            if (!client) throw createError.NotFound("ENTER VALID ID..")

            res.status(201).send({
                success: true,
                message: "client delete successfully",
                data: client
            })
        } catch (error) {
            next(error)
        }
    }
}

