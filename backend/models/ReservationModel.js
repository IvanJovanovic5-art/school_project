const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
date: {type: String, required: true},
time: {type: String, required: true},
user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
company: {type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true}
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;