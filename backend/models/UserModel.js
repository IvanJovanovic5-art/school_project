import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema   = mongoose.Schema;

let userSchema = new Schema({
  'email' : String,
  'firstName' : String,
  'lastName' : String,
  'phoneNumber' : Number,
	'username' : String,
	'password' : String
});

//authenticate input against database
userSchema.statics.authenticate = (username, password, callback) => {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        let err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

const User = mongoose.model('User', userSchema);
export default User;