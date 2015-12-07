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
            name: 'The Bodyguard',
            cover: 'https://upload.wikimedia.org/wikipedia/en/f/f3/TheBodyguardSoundtrack.jpg'
          }
        },
        {
          id: '2',
          type: 'song',
          attributes: {
            name: 'Faith',
            cover: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Faith_-_George_Michael_-_CD_Single.jpg'
          }
        }
      ]
    });
  });

  app.use('/api/songs', songsRouter);
};
