import ReservationModel from '../models/ReservationModel.js';

class ReservationController{

    static async create(req, res) {
        const reservation = new ReservationModel({
            date: req.body.date,
            time: req.body.time,
            company: req.body.company
        });

        try {
            await reservation.save();
            return res.status(200).render('naive-response',
                { text: 'Uspešno ste dodali termin!' });
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating reservation',
                error: err
            });
        }
    }
}

export default ReservationController;