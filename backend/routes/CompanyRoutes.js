import CompanyController from '../controllers/CompanyController.js';
import express from 'express';

const router = express.Router();


function requiresLogin (req, res, next) {
    if (req.session && req.session.userId)  {
        return next();
    } else {
        const err = new Error('Dostop ni dovoljen!');
        err.status = 401;
        return next(err);
    }
}

router.get('/', CompanyController.list); // test method  
router.get('/addCompany', requiresLogin, CompanyController.showAddCompany);

router.post('/addCompany', requiresLogin, CompanyController.create);

router.post('/deleteCompany', requiresLogin, CompanyController.delete);

export default router;
