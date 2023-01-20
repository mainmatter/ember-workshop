'use strict';
const delayedResponse = require('../utils/delayed-response');

var SONGS = [
  {
    id: '1',
    type: 'song',
    attributes: {
      name: 'I will always love you',
      rating: '1',
      'cover-url':
        'https://upload.wikimedia.org/wikipedia/en/f/f3/TheBodyguardSoundtrack.jpg',
    },
  },
  {
    id: '2',
    type: 'song',
    attributes: {
      name: 'The Greatest Love of All',
      rating: '2',
      'cover-url':
        'https://upload.wikimedia.org/wikipedia/en/d/d2/Whitney_Houston_-_Whitney_Houston_%28album%29.jpg',
    },
  },
  {
    id: '3',
    type: 'song',
    attributes: {
      name: "It's Not Right, But It's Okay",
      rating: '3',
      'cover-url':
        'https://upload.wikimedia.org/wikipedia/en/5/51/Whitney_Houston_-_My_Love_Is_Your_Love_album_cover.jpg',
    },
  },
];

module.exports = function (app) {
  const express = require('express');
  let songsRouter = express.Router();

  songsRouter.get('/', function (req, res) {
    delayedResponse(res, {
      data: SONGS,
    });
  });

  app.use('/api/songs', songsRouter);
};
