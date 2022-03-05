const express = require('express')
const router =  express.Router()
const employeesCtrl = require('../controllers/employees.controller')

router.post('/create', employeesCtrl.createEmployee)
router.post('/login', employeesCtrl.validateLogin)

module.exports = router