
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
      //var id = req.params.id.replace(/\n|\r/g, "");
      //res.json(req.params.id);
  
      try {
        await ReservationModel.findByIdAndRemove(req.params.id);
        res.json("Uspešno izbrisana rezervacija");
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

    static async setReservation(req, res){
      ReservationModel.findByIdAndUpdate(req.body._id, {user: req.body.userId}).then(result =>{
          res.status(200).json({message: "Update successful!"});
      }).catch(error =>{
        res.status(500).json({
          message: "Couldn't update reservation!"
        });
      });
    }

    static async removeUserFromReservation(req, res){
      ReservationModel.findByIdAndUpdate(req.body._id, {user: null}).then(result =>{
        res.status(200).json({message: "User removed from reservation!"});
      }).catch(error =>{
        res.status(500).json({
          message: "Couldn't remove user from reservation!"
        });
      });
    }
}

export default ReservationController;