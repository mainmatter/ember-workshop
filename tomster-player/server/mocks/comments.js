/*jshint node:true*/
var uuid = require('node-uuid');
var respondWithDelay = require('../utils/respond-with-delay');

var COMMENTS = [
  {
    id: '1',
    type: 'comment',
    attributes: {
      rating: 1,
      text: 'Not actually my favorite…',
      'created-at': new Date(2016, 0, 10, 12, 34)
    },
    relationships: {
      album: {
        data: { type: 'album', id: '2' }
      }
    }
  },
  {
    id: '2',
    type: 'comment',
    attributes: {
      rating: 5,
      text: 'Such a great album - a total christmas classic for me!',
      'created-at': new Date(2015, 11, 24, 18, 5)
    },
    relationships: {
      album: {
        data: { type: 'album', id: '2' }
      }
    }
  }
];

module.exports = function(app) {
  var express = require('express');
  var commentsRouter = express.Router();

  commentsRouter.post('/', function(req, res) {
    var data = req.body.data;

    if (data.attributes.text && data.attributes.rating) {
      data.id = uuid.v1();
      data.attributes['created-at'] = new Date();

      res.status(201).send({
        data: data
      });
    } else {
      var errors = [];
      ['text', 'rating'].forEach(function(attribute) {
        if (!data.attributes[attribute]) {
          errors.push({
            details: '"' + attribute + '" is a required attribute.',
            source: {
              pointer: 'data/attributes/' + attribute
            }
          });
        }
      });

      res.status(422).send({
        errors: errors
      });
    }
  });

  commentsRouter.get('/:id', function(req, res) {
    var comment = COMMENTS.filter(function(comment) {
      return comment.id === req.params.id
    })[0];

    respondWithDelay(res, {
      data: comment
    });
  });

  app.use('/api/comments', require('body-parser').json({ type: 'application/vnd.api+json' }));
  app.use('/api/comments', commentsRouter);
};
