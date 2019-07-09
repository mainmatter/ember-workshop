'use strict';

var express = require('express');
var app = express();
// eslint-disable-next-line no-unused-vars
var server = require('../tomster-player/server/index.js')(app);

app.listen(3001, function() {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3001');
});