var Credential = require(__dirname + '/../models/credential').model;

exports.show = function (req, res) {
  var id = req.params.id;
};

exports.index = function (req, res) {
  Credential.find({ user_id: req.session.user_id },
    function (err, credentials) {

    if (err) {
      res.json(500, { message: err.message });
    } else {
      res.json(credentials);
    }
  });
};

exports.create = function (req, res) {
  var credential = new Credential(req.body);

  credential.save(function (err) {
    if (err) {
      res.json(500, { message: err.message });
    } else {
      res.json(credential);
    }
  });
};

exports.update = function (req, res) {
  var criteria = { _id: req.params.id };

  Credential.update(criteria, req.body, function (err) {
    if (err) {
      res.json(500, { message: err.message });
    } else {
      res.json(null);
    }
  });
};

exports.destroy = function (req, res) {
  var id = req.params.id;
};
