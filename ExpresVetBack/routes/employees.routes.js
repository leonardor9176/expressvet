const express = require('express')
const router =  express.Router()
const employeesCtrl = require('../controllers/employees.controller')

router.post('/create', employeesCtrl.createEmployee)
router.post('/login', employeesCtrl.validateLogin)
router.get('/validate-token', employeesCtrl.validateToken)


module.exports = router