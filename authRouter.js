const Router = require('express')
const router = new Router
const controller = require('./authController')
const {check} = require('express-validator')

router.post('/registration', [
    check('userName', ' у пользователя должнобыть имя не пустымм').notEmpty(),
    check('password', ' у пользователя должнобыть пароль не пустымм').notEmpty()
], controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router



