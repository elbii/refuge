var path = require('path');

exports.html = function (req, res, next) {
  if (req.xhr) {
    next();
  } else {
    res.sendfile(path.join(__dirname, '../public/index.html'));
  }
};
