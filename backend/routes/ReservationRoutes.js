import express from 'express';
import ReservationController from '../controllers/ReservationController';

const router = express.Router();
router.get('/', ReservationController.list_vsi);
router.get('/reservations', ReservationController.list);

//Za testiranje nisem zaščitu z loginom to je treba dodat pol če bo potrebno
router.post('/addReservation', ReservationController.create);

router.post('/deleteReservation/:id', ReservationController.delete);

export default router;