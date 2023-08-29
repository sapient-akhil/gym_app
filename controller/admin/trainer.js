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
            console.log("existEmail", existEmail)
            if (!existEmail) throw createError.Conflict("mobilenumber or email is wrong")

            const existMobileNumber = await trainerServices.findbyTrainerMobileNumber(req_data.mobilenumber)
            if (!existMobileNumber) throw createError.Conflict("mobilenumber or email is wrong")

            const accessToken = await signAccessToken(existEmail.role, existEmail.name);

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
            const trainer = await trainerServices.findAllTrainerData(page,perPage,search)
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

            const  id  = req.params.id

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

            const existingTrainer = await trainerServices.emailmobilnumber(req_data.email, req_data.mobilenumber)

            if (!existingTrainer) {
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
                if (existingTrainer) {
                    if (existingTrainer.profilePhoto) {
                        fs.unlink(existingTrainer.profilePhoto, (err) => {
                            if (err) {
                                console.error('Error deleting previous image:', err);
                            }
                        });
                    }
                    existingTrainer.profilePhoto = filePath;
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

