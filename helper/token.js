const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {

    signAccessToken: (_id,role, name) => {
        return new Promise((resolve, reject) => {
            const payload = { _id,role, name }
            const secret = process.env.USER_ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: 900
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                    return
                }
                resolve(token)
            })
        })
    },

    verifyAccessTokenforAdmin: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return next(createError.Unauthorized(err.message));
            }

            if (payload.role !== 'admin') {
                const message = 'Only admin can access this route';
                return next(createError.Unauthorized(message));
            }
            req.payload = payload;
            console.log(payload)
            next()
        })
    },

    verifyAccessTokenforTrainer: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return next(createError.Unauthorized(err.message));
            }

            if (payload.role !== 'trainer') {
                const message = 'Only trainers can access this route';
                return next(createError.Unauthorized(message));
            }

            req.payload = payload;
            console.log(payload);
            next();
        })
    }

}




