/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var songsRouter = express.Router();

  songsRouter.get('/', function(req, res) {
    res.send({
      data: [
        {
          id: '1',
          type: 'song',
          attributes: {
            name: 'I will always love you',
            'cover-url': 'https://upload.wikimedia.org/wikipedia/en/f/f3/TheBodyguardSoundtrack.jpg'
          }
        },
        {
          id: '2',
          type: 'song',
          attributes: {
            name: 'The Greatest Love of All',
            'cover-url': 'https://upload.wikimedia.org/wikipedia/en/d/d2/Whitney_Houston_-_Whitney_Houston_%28album%29.jpg'
          }
        },
        {
          id: '3',
          type: 'song',
          attributes: {
            name: "It's Not Right, But It's Okay",
            'cover-url': 'https://upload.wikimedia.org/wikipedia/en/5/51/Whitney_Houston_-_My_Love_Is_Your_Love_album_cover.jpg'
          }
        }
      ]
    });
  });

  songsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/songs', songsRouter);
};
