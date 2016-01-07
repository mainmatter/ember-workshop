/*jshint node:true*/

var SONGS = [
  {
    id: '1',
    type: 'songs',
    attributes: {
      title: 'I will always love you',
      duration: 30000,
      'mp3-url': 'https://p.scdn.co/mp3-preview/91e6d3e0b48cda2f3a1b2391a1c1384fbf73b8a8'
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' }
      }
    }
  },
  {
    id: '2',
    type: 'songs',
    attributes: {
      title: 'Greatest Love of All',
      duration: 30000,
      'mp3-url': 'https://p.scdn.co/mp3-preview/12144a766d983ea0484b29e7c43e70c4ccf535c3'
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '2' }
      }
    }
  },
  {
    id: '3',
    type: 'songs',
    attributes: {
      title: "It's Not Right But It's Okay",
      duration: 30000,
      'mp3-url': 'https://p.scdn.co/mp3-preview/73cdb98b6f4157d0f0ae1950366b022fcfa9a391'
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' }
      }
    }
  }
];

module.exports = function(app) {
  var express = require('express');
  var songsRouter = express.Router();

  songsRouter.get('/', function(req, res) {
    res.send({
      data: SONGS
    });
  });

  songsRouter.get('/:id', function(req, res) {
    var song = SONGS.filter(function(song) {
      return song.id === req.params.id
    })[0];
    res.send({
      data: song
    });
  });

  app.use('/api/songs', songsRouter);
};
