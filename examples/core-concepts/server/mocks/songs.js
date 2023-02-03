'use strict';

module.exports = function(app) {
  const express = require('express');
  let songsRouter = express.Router();

  songsRouter.get('/', function(req, res) {
    res.send({
      data: [
        {
          id: '1',
          type: 'song',
          attributes: {
            name: 'I will always love you',
            'cover-url': 'https://upload.wikimedia.org/wikipedia/en/0/03/Whitney_Houston_-_The_Bodyguard.png'
          }
        },
        {
          id: '2',
          type: 'song',
          attributes: {
            name: 'The Greatest Love of All',
            'cover-url': 'https://upload.wikimedia.org/wikipedia/en/9/96/Whitney_Houston%2C_Self_Titled.png'
          }
        },
        {
          id: '3',
          type: 'song',
          attributes: {
            name: "It's Not Right, But It's Okay",
            'cover-url': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Whitney_Houston_%E2%80%93_My_Love_Is_Your_Love_%28album%29.png'
          }
        }
      ]
    });
  });

  app.use('/api/songs', songsRouter);
};
