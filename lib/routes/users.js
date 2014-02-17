var User = require(__dirname + '/../models/user').model
  , Session = require(__dirname + '/../models/session').model;

exports.create = function (req, res) {
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    publicKey: req.body.publicKey,
    encryptedPrivateKey: req.body.encryptedPrivateKey
  });

  user.save(function (err) {
    if (err) {
      if (err.code === 11000) {
        // duplicate key
        res.json(500, { message: 'email taken' });
      } else {
        res.json(500, { message: err.message });
      }
    } else {
      user.set({ password: null });
      res.json(user);
    }
  });
};

exports.destroy = function (req, res) {

};

exports.show = function (req, res) {
  User.findOne({ _id: req.session.user_id }, function (err, user) {
    if (err) {
      res.json(500, { message: err.message });
    } else {
      res.json(user);
    }
  });
};


exports.update = function (req, res) {
  
};
