if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  // Start cluster
  var cluster = require('cluster');
  var numCPUs = require('os').cpus().length;

  var i;

  if (cluster.isMaster) {
    for (i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', function (worker, code, signal) {
      console.log('worker ' + worker.process.pid + ' died');
    });
  } else {
    require('../lib/refuge');
  }
} else {
  require('../lib/refuge');
}
