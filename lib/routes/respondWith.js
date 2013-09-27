exports.html = function (req, res, next) {
  if (req.xhr) {
    next();
  } else {
    res.sendfile('public/index.html');
  }
};
