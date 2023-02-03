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
        'https://upload.wikimedia.org/wikipedia/en/0/03/Whitney_Houston_-_The_Bodyguard.png',
    },
  },
  {
    id: '2',
    type: 'song',
    attributes: {
      name: 'The Greatest Love of All',
      rating: '2',
      'cover-url':
        'https://upload.wikimedia.org/wikipedia/en/9/96/Whitney_Houston%2C_Self_Titled.png',
    },
  },
  {
    id: '3',
    type: 'song',
    attributes: {
      name: "It's Not Right, But It's Okay",
      rating: '3',
      'cover-url':
        'https://upload.wikimedia.org/wikipedia/en/7/7a/Whitney_Houston_%E2%80%93_My_Love_Is_Your_Love_%28album%29.png',
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
