var argv = require('minimist')(process.argv.slice(2));
var SocketCluster = require('socketcluster');
var socketCluster = new SocketCluster({
    workers: 1,
    brokers: 1,
    port: process.env.PORT || 3007,
    appName: "Zurikato Api",
    workerController: __dirname + '/worker.js',
    brokerController: __dirname + '/broker.js',
    socketChannelLimit: 1000,
    rebootWorkerOnCrash: true
});
