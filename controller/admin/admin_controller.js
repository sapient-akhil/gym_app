const adminModel = require("../../services/trainer/trainer.model");
const { signAccessTokenforAdmin } = require("../../helper/token")
const createError = require("http-errors")
const path = require("path")
const { trainerServices } = require("../../services/index")
const fs = require("fs")
module.exports = {

    adminLogin: async (req, res, next) => {

        try {
            const req_data = req.body;

            const existEmail = await trainerServices.findbyTrainerEmail(req_data.email);
            if (!existEmail) throw createError.NotFound("mobilenumber or email is wrong")

            const existMobileNumber = await trainerServices.findbyTrainerMobileNumber(req_data.mobilenumber)
            if (!existMobileNumber) throw createError.NotFound("mobilenumber or email is wrong")

            const accessToken = await signAccessTokenforAdmin(existEmail);

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
    createAdminBySuperAdmin: async (req, res, next) => {
        try {
            const req_data = req.body

            const email = req_data.email
            const mobilenumber = req_data.mobilenumber

            const existingClient = await trainerServices.emailmobilnumber(req_data.email, req_data.mobilenumber)

            if (!existingClient) {
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
                if (!filePath) throw createError.NotFound("check the path..")

                console.log(filePath)
                if (existingClient) {
                    if (existingClient.profilePhoto) {
                        fs.unlink(existingClient.profilePhoto, (err) => {
                            if (err) {
                                console.error('Error deleting previous image:', err);
                            }
                        });
                    }
                    existingClient.profilePhoto = filePath;
                }

                file.mv(filePath, err => {
                    if (err) return res.status(500).send(err)
                })

                const photo = { profilePhoto: filePath }
                req_data.profilePhoto = photo.profilePhoto
            }

            const array = JSON.parse(req_data.certifications);
            req_data.certifications = array

            const object = { contactdetails: { email, mobilenumber } }
            req_data.contactdetails = object.contactdetails

            const adminData = await trainerServices.updateTrainerData(object.contactdetails.email, object.contactdetails.mobilenumber, req_data)

            res.status(201).send({
                success: true,
                message: "admin is created...",
                data: adminData
            })
        } catch (error) {
            next(error)
        }
    },

    deleteAdminBySuperAdmin: async (req, res, next) => {
        try {

            const { id } = req.params

            const admin = await trainerServices.findByTrainerId(id)
            if (!admin) throw createError.NotFound("ENTER VALID ID..")

            res.status(201).send({
                success: true,
                message: "admin delete successfully",
                data: admin
            })
        } catch (error) {
            next(error)
        }
    },

    allAdmin: async (req, res, next) => {
        try {

            const admin = await trainerServices.findAllTrainerData({ active: true })
            if (!admin) throw createError.NotFound("not found admin...")

            res.status(201).send({
                success: true,
                message: "get all admin",
                data: admin
            })
        } catch (error) {
            next(error)
        }
    },

    oneAdmin: async (req, res, next) => {
        try {

            const { id } = req.params

            const adminData = await trainerServices.findByTrainerId(id)
            if (!adminData) throw createError.NotFound("ENTER VALID ID...")
            if (adminData.active === false) throw createError.NotFound("admin not found...")

            res.status(201).send({
                success: true,
                message: "get one admin",
                data: adminData
            })
        } catch (error) {
            next(error)
        }
    },

    // updateAdminBySuperAdmin: async (req, res, next) => {
    //     try {

    //         const { id } = req.params

    //         const { name, qualifications, certifications, mobilenumber, email } = req.body

    //         const existingClient = await adminModel.findById(id)
    //         if (!existingClient) {
    //             throw createError.NotFound("ENTER VALID ID..");
    //         }

    //         if (email !== existingClient.contactdetails.email) {
    //             const existEmail = await adminModel.findOne({ "contactdetails.email": email });
    //             if (existEmail) {
    //                 throw createError.Conflict("Email already exists");
    //             }
    //         }

    //         if (mobilenumber !== existingClient.contactdetails.mobilenumber) {
    //             const existMobileNumber = await adminModel.findOne({ "contactdetails.mobilenumber": mobilenumber });
    //             if (existMobileNumber) {
    //                 throw createError.Conflict("existMobileNumber already exists");
    //             }
    //         }

    //         const file = req.files.profilePhoto
    //         const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
    //         // console.log("filePath",filePath)

    //         const user1 = await adminModel.findById(id)
    //         // console.log("user1",user1)
    //         if (user1.profilePhoto) {
    //             fs.unlink(user1.profilePhoto, (err) => {
    //                 if (err) {
    //                     console.error('Error deleting previous image:', err);
    //                 }
    //             });
    //         }
    //         user1.profilePhoto = filePath;

    //         file.mv(filePath, err => {
    //             if (err) return res.status(500).send(err)
    //         })
    //         const array = JSON.parse(certifications)

    //         const admin = await adminModel.findByIdAndUpdate(id,
    //             { $set: { name, qualifications, certifications: array, "contactdetails.mobilenumber": mobilenumber, "contactdetails.email": email, profilePhoto: filePath } })

    //         if (!admin) throw createError.NotFound("ENTER VALID ID..")

    //         res.status(201).send({
    //             success: true,
    //             message: "admin update successfully",
    //             data: admin
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }
}
