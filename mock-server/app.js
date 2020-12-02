'use strict';

const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');
const globSync = require('glob').sync;

let app = express();
let server = http.Server(app);
let io = socketIo(server);
app.set('io', io);

app.use(cors());

let mocks = globSync('../tomster-player/server/mocks/**/*.js', { cwd: __dirname }).map(require);
mocks.forEach(route => route(app));

let port = process.env.PORT || 3000;
server.listen(port, function() {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});
