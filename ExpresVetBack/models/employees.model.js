const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


var EmployeeSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, required: true },
    document: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
})

EmployeeSchema.pre('save', function (next) {
    console.log('encrypting pw')
    const agent = this
    if (!agent.isModified('password')) {
        return next()
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        console.log(agent.password)
        bcrypt.hash(agent.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            agent.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('employees', EmployeeSchema)