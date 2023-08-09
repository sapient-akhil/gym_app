const exercisesModel = require("../../model/exercises_model")
const createError = require("http-errors")
const params = require("../../validation/paramsjoi")
const path = require("path")
const fs = require("fs")

exports.exercisesCreate = async (req, res, next) => {
    try {
        const { exercisesName, muscles, description, videoLink } = req.body
        const array = JSON.parse(muscles);

        const file = req.files.photo
        const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
        console.log(filePath)

        file.mv(filePath, err => {
            if (err) return res.status(500).send(err)
        })

        const exercise = new exercisesModel({ exercisesName, muscles: array, description, videoLink, photo: filePath })

        const exerciseData = await exercisesModel.create(exercise)

        res.status(201).send({
            success: true,
            message: "exercises is created...",
            data: exerciseData
        })
    } catch (error) {
        next(error)
    }
}

exports.allExercises = async (req, res, next) => {
    try {
        const allExerciseData = await exercisesModel.find({active:true})

        res.status(201).send({
            success: true,
            message: "get all exercises",
            data: allExerciseData
        })

    } catch (error) {
        next(error)
    }
}

exports.oneExercise = async (req, res, next) => {
    try {

        const { id } = req.params

        const exercise = await params.validateAsync({ id });
        console.log(exercise)

        const exerciseData = await exercisesModel.findById(id)

        res.status(201).send({
            success: true,
            message: "get one exercise",
            data: exerciseData
        })

    } catch (error) {
        next(error)
    }
}
exports.deleteExercise = async (req, res, next) => {
    try {

        const { id } = req.params
        const exercise = await params.validateAsync({ id });
        console.log(exercise)

        const exerciseData = await exercisesModel.findByIdAndUpdate(id, { active: false })
        if (!exerciseData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "exercise delete successfully",
            data: itemData
        })
    } catch (error) {
        next(error)
    }
}

exports.updateExercise = async (req, res, next) => {
    try {

        const { id } = req.params

        const exercise = await params.validateAsync({ id });
        console.log(exercise)

        if (!req.body) throw createError.NotFound("enter update field")

        const { exercisesName, muscles, description, videoLink } = req.body

        const file = req.files.photo
        const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
        // console.log("filePath",filePath)

        const user1 = await exercisesModel.findById(id)
        // console.log("user1",user1)
        if (user1.photo) {
            fs.unlink(user1.photo, (err) => {
                if (err) {
                    console.error('Error deleting previous image:', err);
                }
            });
        }
        user1.photo = filePath;

        file.mv(filePath, err => {
            if (err) return res.status(500).send(err)
        })
        const array = JSON.parse(muscles)

        const exerciseData = await exercisesModel.findByIdAndUpdate(id, { $set: { exercisesName, muscles: array, description, videoLink, photo: filePath } })

        if (!exerciseData) throw createError.NotFound("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "exercise update successfully",
            data: itemData
        })

    } catch (error) {
        next(error)
    }
}




