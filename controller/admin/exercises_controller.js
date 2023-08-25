const exercisesModel = require("../../services/exercises/exercises.model")
const createError = require("http-errors")
const path = require("path")
const fs = require("fs")
const { exercisesServices } = require("../../services/index")

module.exports = {
    exercisesCreate: async (req, res, next) => {
        try {
            const req_data = req.body
            const array = JSON.parse(req_data.muscles);
            req_data.muscles = array

            const existExercisesName = await exercisesServices.findByExercisesName(req_data.exercisesName);
            if (existExercisesName) {
                throw createError.Conflict("existExercisesName already exists");
            }

            if (req.files && req.files.photo) {
                const file = req.files.photo

                const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
                if (!filePath) throw createError.NotFound("check the path..")

                console.log(filePath)
                if (existExercisesName) {
                    if (existExercisesName.photo) {
                        fs.unlink(existExercisesName.photo, (err) => {
                            if (err) {
                                console.error('Error deleting previous image:', err);
                            }
                        });
                    }
                    existExercisesName.photo = filePath;
                }

                file.mv(filePath, err => {
                    if (err) return res.status(500).send(err)
                })

                const photo = { photo: filePath }
                req_data.photo = photo.photo
            }

            const exerciseData = await exercisesServices.updateExercisesData(req_data.exercisesName, req_data)

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
            const search = req.query.search

            const exercises = await exercisesServices.findAllExercisesData(page, perPage, search)
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

            const exerciseData = await exercisesServices.findByExercisesId(id)
            if (!exerciseData.length) throw createError.NotFound("ENTER VALID ID..")
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
    }
}







