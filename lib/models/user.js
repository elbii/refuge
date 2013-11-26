var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'refuge_' +
    (process.env.NODE_ENV || 'development'))
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;


var blankValidator = function (param) {
  return param && param.length > 0;
};


var UserSchema = new mongoose.Schema({
  email: {
    index: {unique: true},
    required: true,
    type: String,
    validate: blankValidator
  },
  password: {
    required: true,
    type: String,
    validate: blankValidator
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
  return this.model('Credential').find({chick_id: this._id}, cb);
};

exports.model = db.model('User', UserSchema);
