var User = require(__dirname + '/../models/user').model
  , Session = require(__dirname + '/../models/session').model;

// Create user
exports.create = function (req, res) {
  var user = new User({ email: req.body.email, password: req.body.password });

  user.save(function (err) {
    if (err) {
      res.json(500, { message: err.message });
    } else {
      user.set({ password: null });
      res.json(user);
    }
  });
};

// Delete user
exports.destroy = function (req, res) {

};

// Load user
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
