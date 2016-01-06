/*jshint node:true*/

var ALBUMS = [
  {
    id: '1',
    type: 'albums',
    attributes: {
      name: 'The Bodyguard',
      'cover-url': 'https://i.scdn.co/image/7bcb439989b592287aeac1599aaa36be17672b73'
    },
    relationships: {
      songs: {
        data: [
          { type: 'song', id: '1' }
        ]
      }
    }
  },
  {
    id: '2',
    type: 'albums',
    attributes: {
      name: 'Whitney Houston',
      'cover-url': 'https://i.scdn.co/image/3c61cf6b053cea492f3962b0b005b4e170afa37a'
    },
    relationships: {
      songs: {
        data: [
          { type: 'song', id: '2' }
        ]
      }
    }
  },
  {
    id: '3',
    type: 'albums',
    attributes: {
      name: 'My Love Is Your Love',
      'cover-url': 'https://i.scdn.co/image/b74dabbd83f6dcc259b7eaaa63fd1e4f5d112b1f'
    },
    relationships: {
      songs: {
        data: [
          { type: 'song', id: '3' }
        ]
      }
    }
  }
];

module.exports = function(app) {
  var express = require('express');
  var albumsRouter = express.Router();

  albumsRouter.get('/', function(req, res) {
    res.send({
      data: ALBUMS
    });
  });

  albumsRouter.get('/:id', function(req, res) {
    var album = ALBUMS.filter(function(album) {
      return album.id === req.params.id
    })[0];
    res.send({
      data: album
    });
  });

  app.use('/api/albums', albumsRouter);
};
