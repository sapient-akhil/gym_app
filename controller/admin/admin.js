const createError = require("http-errors")
const path = require("path")
const { trainerServices } = require("../../services/index")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const JWTSecretKey = process.env.JWT_SECRET_KEY;

module.exports = {

    adminLogin: async (req, res, next) => {

        try {
            const req_data = req.body;

            const existEmail = await trainerServices.findbyTrainerEmail(req_data.email);
            if (!existEmail) throw createError.Conflict("mobilenumber or email is wrong")

            const existMobileNumber = await trainerServices.findbyTrainerMobileNumber(req_data.mobilenumber)
            if (!existMobileNumber) throw createError.Conflict("mobilenumber or email is wrong")

            const payload = {
                role: existEmail.role,
                name: existEmail.name
            };
            
            const accessToken = jwt.sign(payload, JWTSecretKey, { expiresIn: 86400 });

            res.status(201).send({
                success: true,
                message: "admin is login...",
                data: existEmail,
                accessToken
            })

        } catch (error) {
            next(error)
        }
    },
    allAdmin: async (req, res, next) => {
        try {

            const page = parseInt(req.query.page || 1);
            const perPage = 3
            const search = req.query.search
            const adminData = await trainerServices.findAllTrainerData(page, perPage, search)

            res.status(201).send({
                success: true,
                message: "get all adminData",
                data: adminData
            })
        } catch (error) {
            next(error)
        }
    },
    oneAdmin: async (req, res, next) => {
        try {

            const { id } = req.params

            const adminData = await trainerServices.findByTrainerId(id)
            if (!adminData.length) throw createError.NotFound("The admin data with the provided ID could not be found. Please ensure the ID is correct and try again.")

            res.status(201).send({
                success: true,
                message: "get one admin",
                data: adminData
            })
        } catch (error) {
            next(error)
        }
    },
    createUpdateAdmin: async (req, res, next) => {
        try {
            const req_data = req.body

            const existingAdmin = await trainerServices.emailmobilnumber(req_data.email, req_data.mobilenumber)

            if (!existingAdmin) {
                const existEmail = await trainerServices.findbyTrainerEmail(req_data.email);
                if (existEmail) {
                    throw createError.Conflict("Email already exists");
                }
                const existMobileNumber = await trainerServices.findbyTrainerMobileNumber(req_data.mobilenumber);
                if (existMobileNumber) {
                    throw createError.Conflict("mobileNumber already exists");
                }
            }
            if (req.files && req.files.profilePhoto) {
                const file = req.files.profilePhoto

                const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
                if (!filePath) throw createError.NotFound("check the path when image is upload..")

                console.log(filePath)
                if (existingAdmin) {
                    if (existingAdmin.profilePhoto) {
                        fs.unlink(existingAdmin.profilePhoto, (err) => {
                            if (err) {
                                console.error('Error deleting previous image:', err);
                            }
                        });
                    }
                    existingAdmin.profilePhoto = filePath;
                }

                file.mv(filePath, err => {
                    if (err) return res.status(500).send(err)
                })

                const photo = { profilePhoto: filePath }
                req_data.profilePhoto = photo.profilePhoto
            }

            req_data.certifications = JSON.parse(req_data.certifications);

            req_data.contactdetails = { email: req_data.email, mobilenumber: req_data.mobilenumber }

            const adminData = await trainerServices.createUpdateTrainerData(req_data.contactdetails.email, req_data.contactdetails.mobilenumber, req_data)

            res.status(201).send({
                success: true,
                message: "admin is loaded...",
                data: adminData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteAdmin: async (req, res, next) => {
        try {

            const { id } = req.params

            const admin = await trainerServices.deleteTrainerData(id)
            if (!admin) throw createError.NotFound("The admin data with the provided ID could not be found. Please ensure the ID is correct and try again.")

            res.status(201).send({
                success: true,
                message: "admin delete successfully",
                data: admin
            })
        } catch (error) {
            next(error)
        }
    },
    checkSuperAdmin: async (req, res, next) => {
        try {

            const req_data = req.body
            const admin = await trainerServices.findSuperAdminExistOrNOt(req_data.role)
            if (!admin) throw createError.NotFound("no any superAdmin is present.")

            res.status(201).send({
                success: true,
                message: "get superAdmin",
                data: admin
            })
        } catch (error) {
            next(error)
        }
    },
    createSuperAdmin: async (req, res, next) => {

        try {
            const req_data = req.body;

            const superAdmin = await trainerServices.findSuperAdminExistOrNOt(req_data.role)
            if (superAdmin) {
                throw createError.Conflict("superAdmin is already exist");
            }
            const existingSuperAdmin = await trainerServices.emailmobilnumber(req_data.email, req_data.mobilenumber)

            if (!existingSuperAdmin) {
                const existEmail = await trainerServices.findbyTrainerEmail(req_data.email);
                if (existEmail) {
                    throw createError.Conflict("Email already exists");
                }
                const existMobileNumber = await trainerServices.findbyTrainerMobileNumber(req_data.mobilenumber);
                if (existMobileNumber) {
                    throw createError.Conflict("mobileNumber already exists");
                }
            }
            if (req.files && req.files.profilePhoto) {
                const file = req.files.profilePhoto

                const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
                if (!filePath) throw createError.NotFound("check the path when image is upload..")

                file.mv(filePath, err => {
                    if (err) return res.status(500).send(err)
                })

                req_data.profilePhoto = filePath
            }
            req_data.certifications = JSON.parse(req_data.certifications);

            req_data.contactdetails = { email: req_data.email, mobilenumber: req_data.mobilenumber }

            const superAdminData = await trainerServices.createUpdateSuperAdmin(req_data)
            res.status(201).send({
                success: true,
                message: "superAdmin created successfully",
                data: superAdminData,
            });

        } catch (error) {
            next(error)
        }
    }
}