'use strict';
const uuid = require('uuid');

const delayedResponse = require('../utils/delayed-response');

const COMMENTS = [
  {
    id: '1',
    type: 'comment',
    attributes: {
      rating: 1,
      text: 'Not actually my favorite…',
      'created-at': new Date(2016, 0, 10, 12, 34),
    },
    relationships: {
      album: {
        data: { type: 'album', id: '2' },
      },
    },
  },
  {
    id: '2',
    type: 'comment',
    attributes: {
      rating: 5,
      text: 'Such a great album - a total christmas classic for me!',
      'created-at': new Date(2015, 11, 24, 18, 5),
    },
    relationships: {
      album: {
        data: { type: 'album', id: '2' },
      },
    },
  },
];

module.exports = function (app) {
  const express = require('express');
  let commentsRouter = express.Router();
  let io = app.get('io');

  commentsRouter.post('/', function (req, res) {
    let { data } = req.body;

    if (data.attributes.text && data.attributes.rating) {
      data.id = uuid.v1();
      data.attributes['created-at'] = new Date();
      var response = { data };

      res.status(201).send(response);

      for (let [id, socket] of io.sockets.sockets) {
        if (req.headers['x-socket-id'] !== id) {
          socket.emit('new-comment', response);
        }
      }
    } else {
      let errors = [];
      ['text', 'rating'].forEach(function (attribute) {
        if (!data.attributes[attribute]) {
          errors.push({
            details: `attribute" is a required attribute.`,
            source: {
              pointer: `data/attributes/${attribute}`,
            },
          });
        }
      });

      res.status(422).send({
        errors: errors,
      });
    }
  });

  commentsRouter.get('/:id', function (req, res) {
    let comment = COMMENTS.find((comment) => comment.id === req.params.id);

    delayedResponse(res, {
      data: comment,
    });
  });

  app.use(
    '/api/comments',
    require('body-parser').json({ type: 'application/vnd.api+json' })
  );
  app.use('/api/comments', commentsRouter);
};
