const middleware = {}
const jwt = require('jsonwebtoken')
middleware.validateToken = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            const validate = jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs')
            if (validate)
                next()
        } else {
            res.json({
                status: false,
                error: 'parametros invalidos'
            })
        }
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

module.exports = middleware