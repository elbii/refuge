module.exports = process.env.REFUGE_COV ?
  require('./lib-cov/refuge') :
  require('./lib/refuge');
