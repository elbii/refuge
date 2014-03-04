var mongoose = require('mongoose')
  , validator = require('validator')
  , Credential = require('./credential').model
  , connection = mongoose.createConnection('localhost', 'refuge_' +
    (process.env.NODE_ENV || 'development'));

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
  publicKey: String,
  encryptedPrivateKey: String,
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


UserSchema.methods.comparePassword = function (candidate, callback) {
  callback(null, candidate === this.password);
};


// Relations
UserSchema.methods.credentials = function (cb) {
  // this refers to instance of caller
  return Credential.find({ user_id: this._id }, cb);
};

exports.model = connection.model('User', UserSchema);
