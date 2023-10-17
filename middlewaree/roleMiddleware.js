const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json('пользователь не авторизован')
            }
            const {role: userRole} = jwt.verify(token, secret)
            let hasRole = false
            userRole.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json('у вас нет доступа')
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json('пользователь не авторизован')
        }

    }

}