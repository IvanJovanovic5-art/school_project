import ReservationModel from '../models/ReservationModel.js';

class ReservationController{

    
  static async list_vsi(req, res) {
    try {
        const users = await ReservationModel.find();
        return res.json(users);
    } catch (err) {
        return res.status(500).json({
            message: 'Error when getting user.',
            error: err
        });
    }
}


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


    static async delete(req, res) {
      const id = req.params.id;
  
      try {
        let deleteReservation = await UserModel.findByIdAndRemove({ _id: req.params.id});
        if (!deleteReservation) {
          deleteReservation.delete()
            return res.status(201).json(user);
        }
        else {
            return res.json('Uspešno ste izbrisali rezervacijo');
        }
      } catch (err) {
          return res.status(500).json({
              message: 'Error when deleting reservation',
              error: err
          });
      }
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