var Credential = require(__dirname + '/../models/credential').model;

exports.show = function (req, res) {
  var id = req.params.id;
  Credential.findOne({ _id: req.params.id }, function (err, credential) {
    if (err) {
      res.json(500, { message: err.message });
    } else {
      res.json(credential);
    }
  });
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
  // credential.user_id is set by permissions middleware
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
  var criteria = { _id: req.params.id, user_id: req.session.user_id };

  Credential.update(criteria, req.body, function (err, numDocs) {
    if (err) {
      res.json(500, { message: err.message });
    } else if (numDocs === 0) {
      res.json(404, { message: 'id / user combination not found.' });
    } else {
      res.json(null);
    }
  });
};

exports.destroy = function (req, res) {
  var criteria = { _id: req.params.id, user_id: req.session.user_id };

  Credential.remove(criteria, function (err, numDocs) {
    if (err) {
      res.json(500, { message: err.message });
    } else if (numDocs === 0) {
      res.json(404, { message: 'id / user combination not found.' });
    } else {
      res.json(null);
    }
  });
};
