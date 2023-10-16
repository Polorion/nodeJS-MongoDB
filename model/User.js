const {Schema, model} = require('mongoose')

const User = new Schema({
    userName: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: [{type: String, ref: 'Role'}]
})

module.exports = model('user', User)