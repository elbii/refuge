exports.checkSession = function (req, res, next) {
  if (!(req.session.user_id && req.session.id)) {
    res.json(403, { message: 'Not signed in.' });
  } else {
    next();
  }
};
