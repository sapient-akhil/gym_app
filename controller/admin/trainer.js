const createError = require("http-errors")
const { trainerServices } = require("../../services/index")
const jwt = require("jsonwebtoken")
const JWTSecretKey = process.env.JWT_SECRET_KEY;
const uploadProfilePhoto = require("../../common/image.controller")

module.exports = {
    trainerLogin: async (req, res, next) => {
        try {
            const req_data = req.body;

            const existEmail = await trainerServices.findbyTrainerEmail(req_data.email);
            console.log("existEmail", existEmail)
            if (!existEmail) throw createError.Conflict("mobilenumber or email is wrong")

            const existMobileNumber = await trainerServices.findbyTrainerMobileNumber(req_data.mobilenumber)
            if (!existMobileNumber) throw createError.Conflict("mobilenumber or email is wrong")

            const payload = {
                role: existEmail.role,
                name: existEmail.name
            };

            const accessToken = jwt.sign(payload, JWTSecretKey, { expiresIn: 600 })
            res.status(201).send({
                success: true,
                message: "trainer is login...",
                data: existEmail,
                accessToken
            })

        } catch (error) {
            next(error)
        }
    },
    allTrainer: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const perPage = 3
            const search = req.query.search
            const trainer = await trainerServices.findAllTrainerData(page, perPage, search)
            if (!trainer) throw createError.NotFound("The trainer with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "get all trainer",
                data: trainer
            })
        } catch (error) {
            next(error)
        }
    },
    oneTrainer: async (req, res, next) => {
        try {

            const id = req.params.id

            const trainerData = await trainerServices.findByTrainerId(id)
            if (!trainerData) throw createError.NotFound("The trainer with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "get one trainer",
                data: trainerData
            })
        } catch (error) {
            next(error)
        }
    },
    createUpdateTrainerByAdmin: async (req, res, next) => {
        try {
            const req_data = req.body

            const email = req_data.email
            const mobilenumber = req_data.mobilenumber

            const roleData = await trainerServices.emailmobilnumber(req_data.email, req_data.mobilenumber)

            if (!roleData) {
                const existEmail = await trainerServices.findbyTrainerEmail(req_data.email);
                if (existEmail) {
                    throw createError.Conflict("Email already exists");
                }
                const existMobileNumber = await trainerServices.findbyTrainerMobileNumber(req_data.mobilenumber);
                if (existMobileNumber) {
                    throw createError.Conflict("mobileNumber already exists");
                }
            }

            // IMAGE UPLOAD AND WHEN IMAGE IS UPDATE OLD IMAGE DELETE FUNCTION
            const upload = uploadProfilePhoto(req, res, roleData);
            console.log("upload", upload);
            req_data.profilePhoto = upload

            const array = JSON.parse(req_data.certifications);
            req_data.certifications = array

            const object = { contactdetails: { email, mobilenumber } }
            req_data.contactdetails = object.contactdetails

            const trainerData = await trainerServices.createUpdateTrainerData(object.contactdetails.email, object.contactdetails.mobilenumber, req_data)

            res.status(201).send({
                success: true,
                message: "trainer is loaded...",
                data: trainerData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteTrainerByAdmin: async (req, res, next) => {
        try {

            const { id } = req.params

            const trainer = await trainerServices.deleteTrainerData(id)
            if (!trainer) throw createError.NotFound("The trainer with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "trainer delete successfully",
                data: trainer
            })
        } catch (error) {
            next(error)
        }
    }
}
