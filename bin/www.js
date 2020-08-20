/**
 * Module dependencies.
 */
// ES6 支持
require("@babel/register");
require("@babel/polyfill");
// 配置alias支持
require('module-alias/register')

const App = require('../app');
const http = require('http');
const config = require('../config');
const messageServer = require('../app/libs/socket')
const debug = require('debug')('demo:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port || process.env.PORT);

/**
 * Create HTTP server.
 */

const server = http.createServer(App.callback());

/**
 * Listen on provided port, on all network interfaces.
 */
// messageServer.listen(9999)
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('the server is running on '+addr.port)
}
