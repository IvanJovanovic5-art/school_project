import CompanyModel from '../models/CompanyModel.js';

class CompanyController {

    // test method
    static async list(req, res) {
        try {
            const users = await CompanyModel.find();
            return res.json(users);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting user.',
                error: err
            });
        }
    }

    static async show(req, res) {
        const id = req.params.id;
        try {
            const company = await CompanyModel.findOne({ _id: id });
            if (!company) {
                return res.status(404).json({
                    message: 'No such company'
                });
            }
            else {
                return res.json(company);
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    }


    static async create(req, res) {
        const company = new CompanyModel({
            companyName: req.body.companyname,
            address: req.body.address,
            description: req.body.description,
            phoneNumber: req.body.phonenumber,
            advertisementsIDs: [],
            authorizedUserIDs: []
        });
        company.authorizedUserIDs.push(req.session.userId);

        try {
            await company.save();
            return res.status(200).render('naive-response',
                { text: 'Uspesno ste dodali podjetje' });
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating user',
                error: err
            });
        }
    }

    static async delete(req, res) {
        const id = req.params.id;
  
        try {
          let deleteCompany = await CompanyModel.findByIdAndRemove({ _id: req.params.id});
          if (!deleteCompany) {
              deleteCompany.delete();
              return res.status(201).json(deleteCompany);
          }
          else {
              return res.json('Uspešno ste izbrisali podjetje');
          }
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting company',
                error: err
            });
        }
    }

    
    static async login(req, res, next) {
        UserModel.authenticate(req.body.username, req.body.password, function (error, user) {
            if (error || !user) {
                let err = new Error('Wrong username or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.status(200).render('naive-response', { text: 'Uspesno ste se prijavili' });
            }
        })
    }

    static async logout(req, res, next) {
        if (req.session) {
            try {
                await req.session.destroy();
                return res.status(200).render('naive-response', { text: 'Uspesno ste se odjavili' });
            } catch (err) {
                return res.status(500).json(err);
            }
        }
    }

    static showAddCompany(req, res) {
        res.render('company/add-company');
    }

}

export default CompanyController;