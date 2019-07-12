'use strict';

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function(app) {
  const globSync   = require('glob').sync;
  const mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  const proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  const morgan = require('morgan');
  app.use(morgan('dev'));

  mocks.forEach(route => route(app));
  proxies.forEach(route => route(app));

  let server = require('http').Server(app);
  let io = require('socket.io')(server);
  app.set('io', io);

  server.listen(3000);
  // eslint-disable-next-line no-console
  console.log('Websocket server on port 3000');
};
