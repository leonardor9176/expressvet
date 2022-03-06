const express = require('express')
const router =  express.Router()
const employeesCtrl = require('../controllers/employees.controller')
const middleware = require('../middleware/middleware')

router.post('/create', middleware.validateToken, employeesCtrl.createEmployee)
router.post('/login', employeesCtrl.validateLogin)

module.exports = router