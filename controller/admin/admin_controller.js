const adminModel = require("../../services/trainer/trainer.model");
const { signAccessTokenforAdmin } = require("../../helper/token")
const createError = require("http-errors")
const path = require("path")

module.exports = {

    adminLogin: async (req, res, next) => {

        try {
            const { email, mobilenumber } = req.body;
            console.log("email password", req.body)

            const admin = await adminModel.findOne({ "contactdetails.email": email });
            if (!admin) throw createError.NotFound("mobilenumber or email is wrong")

            const existMobileNumber = await adminModel.findOne({ "contactdetails.mobilenumber": mobilenumber })
            if (!existMobileNumber) throw createError.NotFound("mobilenumber or email is wrong")

            const accessToken = await signAccessTokenforAdmin(admin);

            res.status(201).send({
                success: true,
                message: "admin is login...",
                data: admin,
                accessToken
            })

        } catch (error) {
            next(error)
        }
    },
    createAdminBySuperAdmin: async (req, res, next) => {
        try {
            const { name, qualifications, certifications, mobilenumber, email } = req.body

            const existEmail = await adminModel.findOne({ "contactdetails.email": email })
            if (existEmail) return next(createError({status:false}, 'There seems to be an issue with adding the new admin. Please try again.' ));


            const existMobileNumber = await adminModel.findOne({ "contactdetails.mobilenumber": mobilenumber })
            if (existMobileNumber) throw createError.NotFound("this mobilenumber is already exist..")

            const file = req.files.profilePhoto
            const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
            if (!filePath) throw createError.NotFound("check the path..")
            console.log(filePath)

            file.mv(filePath, err => {
                if (err) return res.status(500).send(err)
            })
            const array = JSON.parse(certifications);

            const admin = new adminModel({ name, qualifications, certifications: array, contactdetails: { mobilenumber, email }, profilePhoto: filePath })

            const adminData = await adminModel.create(admin)

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

            const admin = await adminservices.deleteTrainer(id)
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

            const admin = await adminModel.find({ active: true })
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

            const adminData = await adminModel.findById(id)
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

    updateAdminBySuperAdmin: async (req, res, next) => {
        try {

            const { id } = req.params

            const { name, qualifications, certifications, mobilenumber, email } = req.body

            const existingClient = await adminModel.findById(id)
            if (!existingClient) {
                throw createError.NotFound("ENTER VALID ID..");
            }

            if (email !== existingClient.contactdetails.email) {
                const existEmail = await adminModel.findOne({ "contactdetails.email": email });
                if (existEmail) {
                    throw createError.Conflict("Email already exists");
                }
            }

            if (mobilenumber !== existingClient.contactdetails.mobilenumber) {
                const existMobileNumber = await adminModel.findOne({ "contactdetails.mobilenumber": mobilenumber });
                if (existMobileNumber) {
                    throw createError.Conflict("existMobileNumber already exists");
                }
            }

            const file = req.files.profilePhoto
            const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
            // console.log("filePath",filePath)

            const user1 = await adminModel.findById(id)
            // console.log("user1",user1)
            if (user1.profilePhoto) {
                fs.unlink(user1.profilePhoto, (err) => {
                    if (err) {
                        console.error('Error deleting previous image:', err);
                    }
                });
            }
            user1.profilePhoto = filePath;

            file.mv(filePath, err => {
                if (err) return res.status(500).send(err)
            })
            const array = JSON.parse(certifications)

            const admin = await adminModel.findByIdAndUpdate(id,
                { $set: { name, qualifications, certifications: array, "contactdetails.mobilenumber": mobilenumber, "contactdetails.email": email, profilePhoto: filePath } })

            if (!admin) throw createError.NotFound("ENTER VALID ID..")

            res.status(201).send({
                success: true,
                message: "admin update successfully",
                data: admin
            })
        } catch (error) {
            next(error)
        }
    }
}
