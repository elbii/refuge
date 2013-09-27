module.exports = process.env.COV ?
  require('./lib-cov/refuge') :
  require('./lib/refuge');
