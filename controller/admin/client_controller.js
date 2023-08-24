const clientModel = require("../../services/trainer/trainer.services");
const bcrypt = require("bcrypt");
const createError = require("http-errors")
const { clientServices } = require("../../services/index");
const trainer_controller = require("./trainer_controller");

module.exports = {
    createClient: async (req, res, next) => {
        try {
            const req_data = req.body

            const existEmail = await clientServices.findbyClientEmail(req_data.email)
            if (existEmail) throw createError.NotFound("this email is already exist..")

            const existMobileNumber = await clientServices.findbyClientMobileNumber(req_data.mobilenumber)
            if (existMobileNumber) throw createError.NotFound("this mobilenumber is already exist..")

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
            const perPage = 8

            const client = await clientServices.findAllClientData(req.query.search ? {
                active: true,
                $or:
                    [
                        { name: { $regex: req.query.search, $options: 'i' } },
                        { email: { $regex: req.query.search, $options: 'i' } },
                        { address: { $regex: req.query.search, $options: 'i' } }
                    ]
            } : { active: true })
                .limit(perPage * 1)
                .skip((page - 1) * perPage)
                .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
                .populate("trainer_id", { createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
                .exec()

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
                // .populate("trainer_id", ({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 }))
                // .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })

            if (!clientData) throw createError.NotFound("ENTER VALID ID..")
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

            const client = await clientModel.findByIdAndUpdate(id, { active: false }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })
            if (!client) throw createError.NotFound("ENTER VALID ID..")

            res.status(201).send({
                success: true,
                message: "client delete successfully",
                data: client
            })
        } catch (error) {
            next(error)
        }
    },

    updateClient: async (req, res, next) => {
        try {

            const { id } = req.params

            const { name, mobilenumber, email, address, password } = req.body
            const hash = await bcrypt.hash(password, 10);

            const existingClient = await clientModel.findById(id);
            if (!existingClient) {
                throw createError.NotFound("ENTER VALID ID..");
            }

            if (email !== existingClient.email) {
                const existEmail = await clientModel.findOne({ email });
                if (existEmail) {
                    throw createError.Conflict("Email already exists");
                }
            }

            if (mobilenumber !== existingClient.mobilenumber) {
                const existEmail = await clientModel.findOne({ mobilenumber });
                if (existEmail) {
                    throw createError.Conflict("existMobileNumber already exists");
                }
            }

            const client = await clientModel.findByIdAndUpdate(id, { $set: { name, address, password: hash } })
                .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, active: 0 })

            if (!client) throw createError.NotFound("ENTER VALID ID..")
            if (existingClient.active === false) throw createError.NotFound("client not found...")


            res.status(201).send({
                success: true,
                message: "trainer update successfully",
                data: client
            })
        } catch (error) {
            next(error)
        }
    }
}

