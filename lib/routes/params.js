exports.sanitize = function (req, res, next) {
  if (req.body) {
    delete req.body._id;
    delete req.body.__v;
  }

  next();
};
