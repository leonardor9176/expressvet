const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Employee = require('../models/employees.model')

const employeesCtrl = {}

employeesCtrl.createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee({
            name: req.body.name,
            document: req.body.document,
            password: req.body.password,
        });
        await newEmployee.save()
        res.json({ status: true })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }

}

employeesCtrl.validateLogin = async (req, res) => {
    try {
        const { document, password } = req.body
        const employee = await Employee.findOne({ document: document })
        if (!employee) {
            res.json({
                status: false,
                error: 'El usuario y contraseña no son válidos'
            })
        }
        const validation = await bcrypt.compare(password, employee.password)
        if (validation) {
            const token = jwt.sign({ _id: employee._id }, 'RESTFULAPIs', { expiresIn: '30m' })
            res.json({
                status: true,
                data: [{
                    _id: employee._id,
                    token: token
                }]
            })
        }
        else {
            res.json({
                status: false,
                error: 'El usuario y contraseña no son válidos'
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

module.exports = employeesCtrl