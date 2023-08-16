const trainerModel = require("../../model/trainer_model");
const path = require("path")
const createError = require("http-errors")
const { signAccessTokenforTrainer } = require("../../helper/token")
const fs = require("fs")

exports.createTrainerByAdmin = async (req, res, next) => {
    try {
        const { name, qualifications, certifications, mobilenumber, email } = req.body

        const existEmail = await trainerModel.findOne({ "contactdetails.email": email })
        if (existEmail) throw createError.NotFound("this email is already exist..")

        const existMobileNumber = await trainerModel.findOne({ "contactdetails.mobilenumber": mobilenumber })
        if (existMobileNumber) throw createError.NotFound("this mobilenumber is already exist..")

        const file = req.files.profilePhoto
        const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
        if (!filePath) throw createError.NotFound("check the path..")
        console.log(filePath)

        file.mv(filePath, err => {
            if (err) return res.status(500).send(err)
        })
        const array = JSON.parse(certifications);

        const trainer = new trainerModel({ name, qualifications, certifications: array, contactdetails: { mobilenumber, email }, profilePhoto: filePath })

        const trainerData = await trainerModel.create(trainer)

        res.status(201).send({
            success: true,
            message: "trainer is created...",
            data: trainerData
        })
    } catch (error) {
        next(error)
    }
}

exports.trainerLogin = async (req, res, next) => {
    try {
        const { email, mobilenumber } = req.body;
        console.log("email password", req.body)

        const user = await trainerModel.findOne({ "contactdetails.email": email });
        if (!user) throw createError.NotFound("mobilenumber or email is wrong")

        const existMobileNumber = await trainerModel.findOne({ "contactdetails.mobilenumber": mobilenumber })
        if (!existMobileNumber) throw createError.NotFound("mobilenumber or email is wrong")

        const accessToken = await signAccessTokenforTrainer(user);

        res.status(201).send({
            success: true,
            message: "trainer is login...",
            data: user,
            accessToken
        })

    } catch (error) {
        next(error)
    }
}

exports.deleteTrainerByAdmin = async (req, res, next) => {
    try {

        const { id } = req.params

        const trainer = await trainerModel.findByIdAndUpdate(id, { active: false })
        if (!trainer) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "trainer delete successfully",
            data: trainer
        })
    } catch (error) {
        next(error)
    }
}

exports.allTrainer = async (req, res, next) => {
    try {

        const trainer = await trainerModel.find({ active: true })
        if (!trainer) throw createError.NotFound("not found trainer...")

        res.status(201).send({
            success: true,
            message: "get all trainer",
            data: trainer
        })

    } catch (error) {

        next(error)
    }
}

exports.oneTrainer = async (req, res, next) => {
    try {

        const { id } = req.params

        const trainerData = await trainerModel.findById(id)
        if (!trainerData) throw createError.NotFound("ENTER VALID ID...")

        res.status(201).send({
            success: true,
            message: "get one trainer",
            data: trainerData
        })

    } catch (error) {
        next(error)
    }
}

exports.updateTrainerByAdmin = async (req, res, next) => {
    try {

        const { id } = req.params

        const { name, qualifications, certifications, mobilenumber, email } = req.body

        const existingClient = await trainerModel.findById(id)
        if (!existingClient) {
            throw createError.NotFound("ENTER VALID ID..");
        }

        if (email !== existingClient.contactdetails.email) {
            const existEmail = await trainerModel.findOne({ "contactdetails.email": email });
            if (existEmail) {
                throw createError.Conflict("Email already exists");
            }
        }

        if (mobilenumber !== existingClient.contactdetails.mobilenumber) {
            const existMobileNumber = await trainerModel.findOne({ "contactdetails.mobilenumber": mobilenumber });
            if (existMobileNumber) {
                throw createError.Conflict("existMobileNumber already exists");
            }
        }

        const file = req.files.profilePhoto
        const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
        // console.log("filePath",filePath)

        const user1 = await trainerModel.findById(id)
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

        const trainer = await trainerModel.findByIdAndUpdate(id,
            { $set: { name, qualifications, certifications: array, "contactdetails.mobilenumber": mobilenumber, "contactdetails.email": email, profilePhoto: filePath } })

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

