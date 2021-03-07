import express from 'express';
import ReservationController from '../controllers/ReservationController';

const router = express.Router();

//Za testiranje nisem zaščitu z loginom to je treba dodat pol če bo potrebno
router.post('/addReservation', ReservationController.create);

export default router;