var Good = require(__dirname + '/../models/good').model;

exports.show = function (req, res) {
  var id = req.params.id;
  Good.findOne({ _id: req.params.id }, function (err, good) {
    if (err) {
      res.json(500, { message: err.message });
    } else {
      res.json(good);
    }
  });
};

exports.index = function (req, res) {
  Good.find({ user_id: req.session.user_id },
    function (err, goods) {

    if (err) {
      res.json(500, { message: err.message });
    } else {
      res.json(goods);
    }
  });
};

exports.create = function (req, res) {
  // good.user_id is set by permissions middleware
  var good = new Good(req.body);

  good.save(function (err) {
    if (err) {
      res.json(500, { message: err.message });
    } else {
      res.json(good);
    }
  });
};

exports.update = function (req, res) {
  var criteria = { _id: req.params.id, user_id: req.session.user_id };

  Good.update(criteria, req.body, function (err, numDocs) {
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

  Good.remove(criteria, function (err, numDocs) {
    if (err) {
      res.json(500, { message: err.message });
    } else if (numDocs === 0) {
      res.json(404, { message: 'id / user combination not found.' });
    } else {
      res.json(null);
    }
  });
};
