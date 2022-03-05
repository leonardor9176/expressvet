const express = require('express')
const router =  express.Router()
const reservationsCtrl = require('../controllers/reservations.controller')
const middleware = require('../middleware/middleware')

router.post('/create', reservationsCtrl.createReservation)
router.get('/', middleware.validateToken, reservationsCtrl.getReservations)
router.get('/search/', reservationsCtrl.getReservationByUuid)
router.put('/cancel', reservationsCtrl.cancelReservation)

module.exports = router