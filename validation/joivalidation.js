const joi = require("joi");

module.exports = {
    reqId: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID ID...").required(),
    id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID ID..."),
    reqstring: joi.string().required(),
    string: joi.string(),
    array: joi.array().items(
        joi.object({
            mealItemsId: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID mealItemsID...").required(),
            quantity: joi.number().required(),
            unit: joi.string().required()
        })).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(10).required(),
    date: joi.date().iso().required(),
    number: joi.number().required()
}