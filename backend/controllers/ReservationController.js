import ReservationModel from '../models/ReservationModel.js';

class ReservationController{

    
    static async list(req, res) {
        const reservationQuery = ReservationModel.find({company: req.body.company}).sort({date:-1});
        reservationQuery.then(documents =>{
          res.status(200).json({
            message:"Reservations fetched successfully",
            reservations: documents
          });
        }).catch(error =>{
          res.status(500).json({
            message: "Fetching reservations failed!"
          });
        });
    }

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