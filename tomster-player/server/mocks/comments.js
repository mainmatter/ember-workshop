/*jshint node:true*/
var uuid = require('node-uuid');

module.exports = function(app) {
  var express = require('express');
  var commentsRouter = express.Router();

  commentsRouter.post('/', function(req, res) {
    var data = req.body.data;
    data.id = uuid.v1();

    res.status(201).send({
      data: data
    });
  });

  commentsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/comments', require('body-parser').json({ type: 'application/*+json' }));
  app.use('/api/comments', commentsRouter);
};
