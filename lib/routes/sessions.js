var User = require(__dirname + '/../models/user').model
  , Session = require(__dirname + '/../models/session').model;

// Load session
exports.show = function (req, res) {
  var user_id = req.session.user_id
    , session_id = req.session.id
    , sessionWithUser;
  

  Session.findOne({ _id: req.session.id }, function (err, session) {
    if (err) {
      res.json(500, { message: err.message });
    }
    if (session && (session.user_id.toString() === user_id.toString())) {
      User.findOne({ _id: user_id }, function (err, user) {
        if (err) {
          res.json(500, { message: err.message });
        } else {
          // Don't send password over the wire
          sessionWithUser = session.toJSON();
          sessionWithUser.user = user.toJSON();
          delete sessionWithUser.user.password;

          res.json(sessionWithUser);
        }
      });
    } else {
      res.json(403, { message: 'Session / User mismatch. Aborting.' });
    }
  });
};

// List sessions
exports.index = function (req, res) {
  var user_id = req.session.user_id;

  Session.
    find({ user_id: user_id }).
    where('destroyed_at').
    exists(false).
    exec(function (err, sessions) {
      if (err) {
        res.json(500, { message: err.message });
      } else {
        res.json(sessions);
      }
    });
};

// Sign in
exports.create = function (req, res) {
  var sessionWithUser;

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.json(500, { message: err.message });
    } else {
      if (user) {
        user.comparePassword(req.body.password, function (err, match) {
          if (match) {
            // Track session
            Session.create({user_id: user.id}, function (err, session) {
              if (err) {
                res.json(500, { message: err.message });
              } else {
                // set session cookie
                req.session.id = session.id;
                req.session.user_id = user.id;

                // Don't send user's password back over the wire
                sessionWithUser = session.toJSON();
                sessionWithUser.user = user.toJSON();
                delete sessionWithUser.user.password;

                res.json(sessionWithUser);
              }
            });
          } else {
            res.json(403, { message: 'Invalid email or password' });
          }
        });
      } else {
        res.json(403, { message: 'Email not found' });
      }
    }
  });
};

// Sign out
exports.destroy = function (req, res) {
  var changes = { $set: { destroyed_at: Date.now() } };

  Session.update({ _id: req.session.id }, changes, function (err) {
    if (err) {
      res.json(500, { message: err.message });
    } else {
      req.session = null;
      res.json(null);
    }
  });
};
