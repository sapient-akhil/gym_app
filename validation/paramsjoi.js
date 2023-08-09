const joi = require("joi");

const params = joi.object().keys({
    id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID ID..."),
})
module.exports = params;
