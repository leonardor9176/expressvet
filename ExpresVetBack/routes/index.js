const { Router } = require('express'),
router = Router()
router.use('/employees', require('../routes/employees.routes'))
router.use('/reservations', require('../routes/reservations.routes'))

module.exports = router