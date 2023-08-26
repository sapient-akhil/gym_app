const trainerModel = require("../../services/trainer/trainer.model");
const path = require("path")
const createError = require("http-errors")
const { signAccessToken } = require("../../helper/token")
const fs = require("fs")
const { trainerServices } = require("../../services/index")

module.exports = {
    trainerLogin: async (req, res, next) => {
        try {
            const req_data = req.body;

            const existEmail = await trainerServices.findbyTrainerEmail(req_data.email);
            if (!existEmail) throw createError.Conflict("mobilenumber or email is wrong")

            const existMobileNumber = await trainerServices.findbyTrainerMobileNumber(req_data.mobilenumber)
            if (!existMobileNumber) throw createError.Conflict("mobilenumber or email is wrong")

            const accessToken = await signAccessToken(existEmail.role,existEmail.name);

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

            const trainer = await trainerServices.findAllTrainerData()
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

            const { id } = req.params

            const adminData = await trainerServices.findByTrainerId(id)
            if (!adminData) throw createError.NotFound("The trainer with the provided ID could not be found. Please ensure the ID is correct and try again")
            if (adminData.active === false) throw createError.NotFound("trainer not found...")

            res.status(201).send({
                success: true,
                message: "get one trainer",
                data: adminData
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
                if (!filePath) throw createError.NotFound("check the path when image is upload..")

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
                message: "trainer is created...",
                data: adminData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteTrainerByAdmin: async (req, res, next) => {
        try {

            const { id } = req.params

            const trainer = await trainerServices.findByTrainerId(id)
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

//     updateTrainerByAdmin: async (req, res, next) => {
//         try {

//             const { id } = req.params

//             const { name, qualifications, certifications, mobilenumber, email } = req.body

//             const existingClient = await trainerModel.findById(id)
//             if (!existingClient) {
//                 throw createError.NotFound("ENTER VALID ID..");
//             }

//             if (email !== existingClient.contactdetails.email) {
//                 const existEmail = await trainerModel.findOne({ "contactdetails.email": email });
//                 if (existEmail) {
//                     throw createError.Conflict("Email already exists");
//                 }
//             }

//             if (mobilenumber !== existingClient.contactdetails.mobilenumber) {
//                 const existMobileNumber = await trainerModel.findOne({ "contactdetails.mobilenumber": mobilenumber });
//                 if (existMobileNumber) {
//                     throw createError.Conflict("existMobileNumber already exists");
//                 }
//             }

//             const file = req.files.profilePhoto
//             const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
//             // console.log("filePath",filePath)

//             const user1 = await trainerModel.findById(id)
//             // console.log("user1",user1)
//             if (user1.profilePhoto) {
//                 fs.unlink(user1.profilePhoto, (err) => {
//                     if (err) {
//                         console.error('Error deleting previous image:', err);
//                     }
//                 });
//             }
//             user1.profilePhoto = filePath;

//             file.mv(filePath, err => {
//                 if (err) return res.status(500).send(err)
//             })
//             const array = JSON.parse(certifications)

//             const trainer = await trainerModel.findByIdAndUpdate(id,
//                 { $set: { name, qualifications, certifications: array, "contactdetails.mobilenumber": mobilenumber, "contactdetails.email": email, profilePhoto: filePath } })

//             if (!trainer) throw createError.NotFound("ENTER VALID ID..")

//             res.status(201).send({
//                 success: true,
//                 message: "trainer update successfully",
//                 data: trainer
//             })
//         } catch (error) {
//             next(error)
//         }
//     }
// }




// exports.getClientMeal = async (req, res, next) => {
//     try {

//         const pipeline = [];

//         pipeline.push({
//             $lookup: {
//                 from: "clientinfos",
//                 localField: "trainer_id",
//                 foreignField: "id",
//                 as: "data"
//             }
//         })

//         pipeline.push({
//             $unwind: { path: "$data" }
//         })

//         pipeline.push({
//             $lookup: {
//                 from: "trainerinfos",
//                 let: { id: "$id" },
//                 pipeline: [
//                     {
//                         $match: {
//                             $expr: {
//                                 $eq: ["$trainer_id", "$$id"],
//                             },
//                         },
//                     },
//                 ],
//                 as: "Data",
//             },
//         });
//         const allitems = await mealPlanModel.aggregate(pipeline)

//         // const allitemss = await clientModel.find().populate("trainer_id")

//         res.status(200).send({
//             status: true,
//             message: "ok done",
//             data: allitems
//         })
//     } catch (error) {
//         next(error)
//     }
// }


// exports.createMealPlanForClient = async (req, res, next) => {
//     try {

//         const pipeline = [];

//         pipeline.push({
//             $lookup: {
//                 from: "clientinfos",
//                 localField: "trainer_id",
//                 foreignField: "id",
//                 as: "data"
//             }
//         })

//         pipeline.push({
//             $unwind: { path: "$data", preserveNullAndEmptyArrays: true },
//           });

//         // pipeline.push({
//         //     $lookup:{
//         //         from:"data.id",
//         //         localField:"id",
//         //         foreignField:"clientId",
//         //         as:"sdswfasf"
//         //     }
//         // })
//         const allitems = await trainerModel.aggregate(pipeline)


//         // const allitemss = await clientModel.find().populate("trainer_id")


//         res.status(200).send({
//             status: true,
//             message: "ok done",
//             data: allitems
//         })
//     } catch (error) {
//         next(error)
//     }
// }

