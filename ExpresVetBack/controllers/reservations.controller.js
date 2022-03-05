const { v4: uuidv4 } = require('uuid');
const Reservation = require('../models/reservations.model')

const reservationsCtrl = {}
reservationsCtrl.createReservation = async (req, res) => {
    try {
        const { reservationDate } = req.body
        const reservationDateUtc = new Date(reservationDate)
        const start = new Date(reservationDateUtc.getTime() - 3600000)
        const end = new Date(reservationDateUtc.getTime() + 3600000)

        const reservations = await Reservation.find({
            reservationDate: {
                $gte: start,
                $lt: end
            }
        })
        let available = true
        reservations.forEach(r => {
            if (r.status != 'cancelada')
                available = false
        });
        if (!available) {
            res.json({
                status: false,
                available: available
            })
        }
        else {
            const newReservation = new Reservation({
                name: req.body.name,
                document: req.body.document,
                reservationDate: req.body.reservationDate,
                description: req.body.description,
                uuid: uuidv4(),
                status: 'reservada',
                comments: [
                    {
                        dateComent: Date.now(),
                        comment: 'reserva exitosa'
                    }
                ],
                updatedAt: Date.now(),
            });
            await newReservation.save()
            const reservationAux = {
                name: newReservation.name,
                document: newReservation.document,
                reservationDate: newReservation.reservationDate,
                description: newReservation.description,
                uuid: newReservation.uuid,
                status: newReservation.status,
                createdAt: newReservation.createdAt,
                updatedAt: newReservation.updatedAt
            }
            res.json({
                status: true,
                available: available,
                data: [reservationAux]
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

reservationsCtrl.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
        res.json({
            status: true,
            data: reservations
        })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

reservationsCtrl.getReservationByUuid = async (req, res) => {
    try {
        const { uuid } = req.query

        const reservation = await Reservation.findOne({ uuid: uuid })
        const reservationAux = {
            name: reservation.name,
            reservationDate: reservation.reservationDate,
            description: reservation.description,
            uuid: reservation.uuid,
            status: reservation.status,
            createdAt: reservation.createdAt,
            updatedAt: reservation.updatedAt
        }
        res.json({
            status: true,
            data: [reservationAux]
        })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

reservationsCtrl.cancelReservation = async (req, res) => {
    try {
        const { uuid, document, comment } = req.body
        const reservation = await Reservation.findOneAndUpdate({ uuid: uuid, document: document }, { status: 'cancelada', $push: { comments: { dateComent: Date.now(), comment: `cita cancelada: ${comment}` } } })
        if (reservation) {
            res.json({
                status: true,
                validDocument: true
            })
        }
        else {
            res.json({
                status: false,
                validDocument: false
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

module.exports = reservationsCtrl
