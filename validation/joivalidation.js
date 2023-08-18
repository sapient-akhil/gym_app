const joi = require("joi");

module.exports = {
    reqId: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID ID...").required(),
    id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID ID..."),
    reqstring: joi.string().required(),
    string: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(10).required(),
    date: joi.date().iso().required(),
    number: joi.number().required()
    // array: joi.array().items(
    //     joi.object({
    //         exercises_id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID mealItemsID...").required(),
    //         quantity: joi.number().required(),
    //         unit: joi.string().required()
    //     })).required(),
    // array1 :joi.array().items(
    //     joi.object({
    //         exercises_id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID mealItemsID...").required(),
    //         workOutName: joi.string().required(),
    //         time: joi.string().required(),
    //         reps: joi.string().required(),
    //         set: joi.string().required(),
    //         volume: joi.string().required()
    //     })).required(),
}