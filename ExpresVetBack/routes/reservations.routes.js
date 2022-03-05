const express = require('express')
const router =  express.Router()
const reservationsCtrl = require('../controllers/reservations.controller')

router.post('/create', reservationsCtrl.createReservation)
router.get('/', reservationsCtrl.getReservations)
router.get('/search/', reservationsCtrl.getReservationByUuid)
router.put('/cancel', reservationsCtrl.cancelReservation)

module.exports = router