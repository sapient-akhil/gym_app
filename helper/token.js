const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {

    verifyAccessTokenforAdmin: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const token = req.headers['authorization']

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
        const token = req.headers['authorization']

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
        const token = req.headers['authorization']

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




