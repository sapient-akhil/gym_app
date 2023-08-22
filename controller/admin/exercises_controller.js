const exercisesModel = require("../../model/exercises_model")
const createError = require("http-errors")
const path = require("path")
const fs = require("fs")

module.exports = {
    exercisesCreate: async (req, res, next) => {
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
    },

    allExercises: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const perPage = 3

            const exercises = await exercisesModel.find(req.query.search ? {
                active: true,
                $or:
                    [
                        { exercisesName: { $regex: req.query.search, $options: 'i' } },
                        { description: { $regex: req.query.search, $options: 'i' } },
                        { videoLink: { $regex: req.query.search, $options: 'i' } }
                    ]
            } : { active: true })
                .limit(perPage * 1)
                .skip((page - 1) * perPage)
                .exec();

            if (exercises.length === 0) throw createError.NotFound("Not found exercises..")

            res.status(201).send({
                success: true,
                message: "get Exercises",
                data: exercises
            })
        } catch (error) {
            next(error)
        }
    },

    oneExercise: async (req, res, next) => {
        try {

            const { id } = req.params

            const exerciseData = await exercisesModel.findById(id)
            if (!exerciseData) throw createError.NotFound("ENTER VALID ID..")
            if (exerciseData.active === false) throw createError.NotFound("exercise not found...")

            res.status(201).send({
                success: true,
                message: "get one exercise",
                data: exerciseData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteExercise: async (req, res, next) => {
        try {

            const { id } = req.params

            const exerciseData = await exercisesModel.findByIdAndUpdate(id, { active: false })
            if (!exerciseData) throw createError.NotFound("ENTER VALID ID..")

            res.status(201).send({
                success: true,
                message: "exercise delete successfully",
                data: exerciseData
            })
        } catch (error) {
            next(error)
        }
    },

    updateExercise: async (req, res, next) => {
        try {

            const { id } = req.params

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
                data: exerciseData
            })
        } catch (error) {
            next(error)
        }
    }
}






