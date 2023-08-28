const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {

    signAccessToken: (role, name) => {
        return new Promise((resolve, reject) => {
            const payload = { role, name }
            const secret = process.env.JWT_SECRET_KEY
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
        JWT.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
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
        JWT.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
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
    },

    verifyAccessTokenforSuperAdmin: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                return next(createError.Unauthorized(err.message));
            }

            if (payload.role !== 'superadmin') {
                const message = 'Only superadmin can access this route';
                return next(createError.Unauthorized(message));
            }

            req.payload = payload;
            console.log(payload);
            next();
        })
    }

}




