import UserModel from '../models/UserModel.js';

class UserController {

    static async list(req, res) {
        try {
            const users = await UserModel.find();
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
            const user = await UserModel.findOne({ _id: id });
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            else {
                return res.json(user);
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    }


    static async create(req, res) {
        const user = new UserModel({
            email: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            phoneNumber: req.body.phonenumber,
            username: req.body.username,
            password: req.body.password,
        });
        try {
            let takenUsername = await UserModel.findOne({ username: req.body.username });
            if (!takenUsername) {
                return res.status(201).json(user);
            }
            else {
                return res.json('Username is taken');
            }
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating user',
                error: err
            });
        }
    }

    static async delete(req, res) {
        try {
            await UserController.findByIdAndRemove(req.params.id);
            res.json("Uspešno izbrisan uporabnik.");
          } catch (err) {
              return res.status(500).json({
                  message: 'Error when deleting user',
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

    static showLogin(req, res) {
        res.render('user/login');
    }

    static showRegister(req, res) {
        res.render('user/register');
    }
}

export default UserController;