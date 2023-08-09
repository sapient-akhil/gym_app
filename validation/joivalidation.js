const joi = require("joi");

module.exports = {
    id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID ID..."),
    reqstring: joi.string().required(),
    string: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(10).required(),
    date: joi.date().iso().required(),
    number:joi.number().required()
}