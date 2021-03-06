const mongoose = require('mongoose')

var ReservationSchema = new mongoose.Schema
    ({
        name: { type: String, required: true },
        document: { type: Number, required: true },
        reservationDate: { type: Date, required: true },
        description: { type: String, lowercase: true, required: true },
        uuid: { type: String },
        status: { type: String },
        comments: [
            {
                dateComment: Date,
                comment: String
            }
        ],
        createdAt: { type: Date, default: Date.now() }
    })

module.exports = mongoose.model('reservations', ReservationSchema)
