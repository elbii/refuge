var mongoose = require('mongoose')
  , validator = require('validator')
  , Credential = require('./credential').model
  , connection = mongoose.createConnection('localhost', 'refuge_' +
    (process.env.NODE_ENV || 'development'))
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

var passwordValidator = function (param) {
  return param.length > 7 && param.length < 129;
};

var UserSchema = new mongoose.Schema({
  email: {
    index: { unique: true },
    required: true,
    type: String,
    validate: validator.isEmail
  },
  password: {
    required: true,
    type: String,
    validate: passwordValidator
  },
  created_at: {
    default: Date.now,
    type: Date
  },
  updated_at: Date
});


UserSchema.pre('save', function (next) {
  var user = this;

  // only hash password if it's been changed
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash new password along with salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.comparePassword = function (candidate, callback) {

  bcrypt.compare(candidate, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};


// Relations
UserSchema.methods.credentials = function (cb) {

  // this refers to instance of caller
  return Credential.find({ user_id: this._id }, cb);
};

exports.model = connection.model('User', UserSchema);
