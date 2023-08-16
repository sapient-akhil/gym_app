const clientModel = require("../model/client_model");
const bcrypt = require("bcrypt");
const createError = require("http-errors")

exports.createClient = async (req, res, next) => {
    try {
        const { name, mobilenumber, email, address, password } = req.body

        const existEmail = await clientModel.findOne({ email })
        if (existEmail) throw createError.NotFound("this email is already exist..")

        const existMobileNumber = await clientModel.findOne({ mobilenumber })
        if (existMobileNumber) throw createError.NotFound("this mobilenumber is already exist..")

        const payload = req.payload;
        const id = payload.aud[0]._id

        const hash = await bcrypt.hash(password, 10);

        const user = new clientModel({ trainer_id: id, name, mobilenumber, email, address, password: hash })

        const clientData = await clientModel.create(user)
        if (!clientData) throw createError.NotFound("client not create");

        res.status(201).send({
            success: true,
            message: "client is created...",
            data: clientData
        })
    } catch (error) {
        next(error)
    }
}
exports.clientLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const client = await clientModel.findOne({ email });
        if (!client) throw createError.NotFound("email id does not exists")

        const passwordMatch = await bcrypt.compare(password, user.password);
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
exports.deleteClient = async (req, res, next) => {
    try {

        const { id } = req.params

        const client = await clientModel.findByIdAndUpdate(id, { active: false })
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

exports.allClient = async (req, res, next) => {

    try {
        const page = parseInt(req.query.page || 1);
        const perPage = 8

        const client = await clientModel.find(req.query.search ? {
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
}

exports.oneClient = async (req, res, next) => {
    try {

        const { id } = req.params

        const clientData = await clientModel.findById(id)
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
}

exports.updateClient = async (req, res, next) => {
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

        const trainer = await clientModel.findByIdAndUpdate(id, { $set: { name, address, password: hash } })

        if (!trainer) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "trainer update successfully",
            data: trainer
        })
    } catch (error) {
        next(error)
    }
}