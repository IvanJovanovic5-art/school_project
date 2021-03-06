import UserController from '../controllers/UserController.js';
import express from 'express';

const router = express.Router();

/*
 * GET
 */
router.get('/', UserController.list);
router.get('/login', UserController.showLogin);
router.get('/register', UserController.showRegister);

router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

//router.get('/logout', UserController.logout);

export default router;
