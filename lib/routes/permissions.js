exports.enforce = function (req, res, next) {
  if (req.body) {
    req.body.user_id = req.session.user_id;
  }

  next();
};
