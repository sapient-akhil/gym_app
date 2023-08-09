const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {

    // sign and verify token for ADMIN 

    signAccessTokenforAdmin: (user) => {
        return new Promise((resolve, reject) => {
            const payload = { user }
            const secret = process.env.ADMIN_ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: 900,
                // issuer: 'pickurpage.com',
                // audience: [user],
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
        JWT.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message =
                    err.name === 'JsonWebTokenError' ? 'only admin can access this routes' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload;
            //  console.log(payload)
            next()
        })
    },


// sign and verify token for TRAINER

signAccessTokenforTrainer: (user) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.USER_ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: 900,
            // issuer: 'pickurpage.com',
            audience: [user],
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
verifyAccessTokenforTrainer: (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            const message =
                err.name === 'JsonWebTokenError' ? 'only trainer can access this routes' : err.message
            return next(createError.Unauthorized(message))
        }
        req.payload = payload
        console.log(payload)
        next()
    })
}

}




