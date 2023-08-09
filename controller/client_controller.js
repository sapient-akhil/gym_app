const clientModel = require("../model/client_model");
const bcrypt = require("bcrypt");
const params = require("../validation/paramsjoi")
const createError = require("http-errors")

exports.createClient = async (req, res, next) => {
    try {
        const { name, mobilenumber, email, address, password } = req.body

        const existEmail = await clientModel.findOne({ email })
        if (existEmail) throw createError.NotFound("this email is already exist..")

        const existMobileNumber = await clientModel.findOne({ mobilenumber })
        if (existMobileNumber) throw createError.NotFound("this mobilenumber is already exist..")

        const payload = req.payload;
        const id = payload.user._id

        const hash = await bcrypt.hash(password, 10);

        const user = new clientModel({ trainer_id: id, name, mobilenumber, email, address, password: hash })

        const clientData = await clientModel.create(user)

        res.status(201).send({
            success: true,
            message: "trainer is created...",
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
        const result = await params.validateAsync({ id });
        console.log(result)

        const client = await clientModel.findByIdAndUpdate(id, { active: false })
        if (!client) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "trainer delete successfully",
            data: client
        })
    } catch (error) {
        next(error)
    }
}

exports.allClient = async (req, res, next) => {
    try {

        const client = await clientModel.find({active:true})

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

        const client = await params.validateAsync({ id });
        console.log(client)

        const clientData = await clientModel.findById(id)

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

        const result = await params.validateAsync({ id });
        console.log(result)

        if (!req.body) throw createError.NotFound("enter update field")

        const { name, mobilenumber, email, address, password } = req.body

        const trainer = await clientModel.findByIdAndUpdate(id, { $set: { name, mobilenumber, email, address, password } })

        if (!trainer) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "user update successfully",
            data: trainer
        })

    } catch (error) {
        next(error)
    }
}