'use strict';
const delayedResponse = require('../utils/delayed-response');

const ALBUMS = [
  {
    id: '1',
    type: 'album',
    attributes: {
      title: 'The Bodyguard',
      'cover-url':
        'https://i.scdn.co/image/7bcb439989b592287aeac1599aaa36be17672b73',
    },
    relationships: {
      songs: {
        data: [
          { type: 'song', id: '1' },
          { type: 'song', id: '2' },
          { type: 'song', id: '3' },
          { type: 'song', id: '4' },
          { type: 'song', id: '5' },
          { type: 'song', id: '6' },
          { type: 'song', id: '7' },
          { type: 'song', id: '8' },
          { type: 'song', id: '9' },
          { type: 'song', id: '10' },
          { type: 'song', id: '11' },
        ],
      },
      comments: {
        data: [],
      },
    },
  },
  {
    id: '2',
    type: 'album',
    attributes: {
      title: 'Whitney Houston',
      'cover-url':
        'https://i.scdn.co/image/3c61cf6b053cea492f3962b0b005b4e170afa37a',
    },
    relationships: {
      songs: {
        data: [
          { type: 'song', id: '12' },
          { type: 'song', id: '13' },
          { type: 'song', id: '14' },
          { type: 'song', id: '15' },
          { type: 'song', id: '16' },
          { type: 'song', id: '17' },
          { type: 'song', id: '18' },
          { type: 'song', id: '19' },
          { type: 'song', id: '20' },
        ],
      },
      comments: {
        data: [
          { type: 'comment', id: '1' },
          { type: 'comment', id: '2' },
        ],
      },
    },
  },
  {
    id: '3',
    type: 'album',
    attributes: {
      title: 'My Love Is Your Love',
      'cover-url':
        'https://i.scdn.co/image/b74dabbd83f6dcc259b7eaaa63fd1e4f5d112b1f',
    },
    relationships: {
      songs: {
        data: [
          { type: 'song', id: '21' },
          { type: 'song', id: '22' },
          { type: 'song', id: '23' },
          { type: 'song', id: '24' },
          { type: 'song', id: '25' },
          { type: 'song', id: '26' },
          { type: 'song', id: '27' },
          { type: 'song', id: '28' },
          { type: 'song', id: '29' },
          { type: 'song', id: '30' },
          { type: 'song', id: '31' },
          { type: 'song', id: '32' },
          { type: 'song', id: '33' },
        ],
      },
      comments: {
        data: [],
      },
    },
  },
];

module.exports = function (app) {
  const express = require('express');
  let albumsRouter = express.Router();

  albumsRouter.get('/', function (req, res) {
    delayedResponse(res, {
      data: ALBUMS,
    });
  });

  albumsRouter.get('/:id', function (req, res) {
    let album = ALBUMS.find((album) => album.id === req.params.id);

    delayedResponse(res, {
      data: album,
    });
  });

  app.use('/api/albums', albumsRouter);
};
