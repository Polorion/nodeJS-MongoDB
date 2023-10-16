const User = require('./model/User')
const Role = require('./model/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
const {secret} = require('./config')
const generateJWT = (id, role) => {
    const payload = {
        id, role
    }
    return jwt.sign(payload, secret, {expiresIn: '10h'})
}

class AuthController {
    async registration(req, res) {

        try {
            const error = validationResult(req)
            if (!error.isEmpty()) {
                return res.status(400).json({massage: "ошибка при регистрации", error})
            }
            const {userName, password} = req.body
            const candidate = await User.findOne({userName})
            if (candidate) {
                res.status(400).json('ползователь уже суествует')
            }
            const hashPassword = bcrypt.hashSync(password, 6);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({userName, password: hashPassword, role: userRole.value})
            await user.save()
            return res.json('пользователь создан')
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        const {userName, password} = req.body
        const findUser = await User.findOne({userName})
        if (!findUser) {
            return res.status(400).json('такого пользователя нету')
        }
        const validPassword = bcrypt.compareSync(password, findUser.password)
        if (!validPassword) {
            return res.status(400).json('пароль не совпадает')
        }
        const token = generateJWT(findUser._id, findUser.role)
        return res.json({token})

        try {
        } catch (e) {
            console.log(e)
        }
    }

    async getUsers(req, res) {

        try {
            const users = await User.find()
            return res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new AuthController()

