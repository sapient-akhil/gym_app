const adminModel = require("../../model/trainer_model");
const { signAccessTokenforAdmin } = require("../../helper/token")
const createError = require("http-errors")

module.exports = {
    adminLogin : async (req, res, next) => {

        try {
            const { email, mobilenumber } = req.body;
            console.log("email password", req.body)
    
            const user = await adminModel.findOne({ "contactdetails.email": email });
            if (!user) throw createError.NotFound("mobilenumber or email is wrong")
    
            // if (user.role === "admin") throw createError.NotFound("This is a admin data, User cann't get....")
    
            const existMobileNumber = await adminModel.findOne({ "contactdetails.mobilenumber": mobilenumber })
            if (!existMobileNumber) throw createError.NotFound("mobilenumber or email is wrong")
    
            const accessToken = await signAccessTokenforAdmin(user);
    
            res.status(201).send({
                success: true,
                message: "admin is login...",
                data: user,
                accessToken
            })
    
        } catch (error) {
            next(error)
        }
    }
}