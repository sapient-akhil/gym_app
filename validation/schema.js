const joi = require("joi");
const validate = require("../validation/joivalidation")

module.exports = {
    trainerSchema: joi.object().keys({
        name: validate.reqstring,
        qualifications: validate.reqstring,
        certifications: validate.reqstring,
        mobilenumber: validate.reqstring,
        email: validate.email
    }),
    params: joi.object().keys({
        id: validate.reqId
    }),
    bodyPartId: joi.object().keys({
        bodyPartId: validate.reqId
    }), 
    loginSchema: joi.object().keys({
        mobilenumber: validate.reqstring,
        email: validate.email
    }),
    clientLoginSchema: joi.object().keys({
        password: validate.reqstring,
        email: validate.email
    }),
    clientSchema: joi.object().keys({
        name: validate.reqstring,
        address: validate.reqstring,
        mobilenumber: validate.reqstring,
        email: validate.email,
        password: validate.password,
    }),
    mealItemSchema: joi.object().keys({
        trainer_id: validate.id,
        mealItem: validate.reqstring,
        calary: validate.reqstring,
        // quantityUnits: validate.reqstring,
        description: validate.reqstring,
        ingredients: validate.reqstring
    }),
    mealPlanSchema: joi.object().keys({
        clientId: validate.reqId,
        breakFast: validate.reqstring,
        morningSnack: validate.reqstring,
        lunch: validate.reqstring,
        eveningSnack: validate.reqstring,
        dinner: validate.reqstring,
        date:validate.date
    }),
    exercisesSchema: joi.object().keys({
        exercisesName: validate.reqstring,
        muscles: validate.reqstring,
        // photo: validate.reqstring,
        description: validate.reqstring,
        videoLink: validate.reqstring
    }),
    workOutSchema: joi.object().keys({
        exercises_id: validate.reqstring,
        workOutName: validate.reqstring,
        time: validate.reqstring,
        reps: validate.reqstring,
        set: validate.reqstring,
        reps: validate.reqstring,
        volume: validate.reqstring,
        date: validate.date
    }),
    unitSchema: joi.object().keys({
        // id: validate.reqId,
        unit: validate.reqstring,
    }),
    bodyPartSchema: joi.object().keys({
        unitId: validate.reqId,
        bodyPart: validate.reqstring,
    }),
    measurmentSchema: joi.object().keys({
        bodyPartId: validate.reqId,
        date: validate.date,
        unitValue: validate.number
    })
}