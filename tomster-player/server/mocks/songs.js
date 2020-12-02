'use strict';
const delayedResponse = require('../utils/delayed-response');

const SONGS = [
  {
    id: '1',
    type: 'song',
    attributes: {
      title: 'I Will Always Love You',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/91e6d3e0b48cda2f3a1b2391a1c1384fbf73b8a8',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' },
      },
    },
  },
  {
    id: '2',
    type: 'song',
    attributes: {
      title: 'I Have Nothing',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/c0f4dcce1ca7f6142d709185db1ffa44ff2d4d4a',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' },
      },
    },
  },
  {
    id: '3',
    type: 'song',
    attributes: {
      title: "I'm Every Woman",
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/35c63cbe4e3ce454a7c5cfe4b0c73a96867104d2',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' },
      },
    },
  },
  {
    id: '4',
    type: 'song',
    attributes: {
      title: 'Run to You',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/31ee6ef0e30bce43b36868fbba1ef6d33d57f676',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' },
      },
    },
  },
  {
    id: '5',
    type: 'song',
    attributes: {
      title: 'Queen of the Night - Radio Edit',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/93d4766c2206afc83115c826db21dad04146260d',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' },
      },
    },
  },
  {
    id: '6',
    type: 'song',
    attributes: {
      title: 'Jesus Loves Me',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/29ca83b0e63e84dbf6037e2938d70f004a0b6735',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' },
      },
    },
  },
  {
    id: '7',
    type: 'song',
    attributes: {
      title: 'Even If My Heart Would Break',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/0412ddb6769bc816c32d39b41d5c64c0dc0f7b39',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' },
      },
    },
  },
  {
    id: '8',
    type: 'song',
    attributes: {
      title: "Someday (I'm Coming Back)",
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/04a30d510b49ebf4703a264a273250da071f8c0d',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' },
      },
    },
  },
  {
    id: '9',
    type: 'song',
    attributes: {
      title: "It's Gonna Be A Lovely Day",
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/d07c247cf00ce0be860128d78d1fcebbd3704719',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' },
      },
    },
  },
  {
    id: '10',
    type: 'song',
    attributes: {
      title: "What's So Funny 'Bout Peace, Love And Understanding",
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/4960d180e22680cfa3a3c9207a819fbcf51b5da6',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' },
      },
    },
  },
  {
    id: '11',
    type: 'song',
    attributes: {
      title: 'Theme From The Bodyguard',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/b4126944d90fd8a324a8c7b49865b3157d7fdc37',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '1' },
      },
    },
  },
  {
    id: '12',
    type: 'song',
    attributes: {
      title: 'You Give Good Love',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/dc77dfeffba6def27cfaec208623ab82cc33cacc',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '2' },
      },
    },
  },
  {
    id: '13',
    type: 'song',
    attributes: {
      title: 'Thinking About You',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/bb028d1c7ee4bdce473c8893bed9be10d96fca90',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '2' },
      },
    },
  },
  {
    id: '14',
    type: 'song',
    attributes: {
      title: 'Someone For Me',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/fa122fc83887290f71248c00cbdd8d700011c9df',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '2' },
      },
    },
  },
  {
    id: '15',
    type: 'song',
    attributes: {
      title: 'Saving All My Love for You',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/bdf418c1f20fa3d40651fa1fbd1936f36d9160f6',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '2' },
      },
    },
  },
  {
    id: '16',
    type: 'song',
    attributes: {
      title: 'Nobody Loves Me Like You Do',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/d1ea2dcfbe9afe462f99bbcc455d069ed10def56',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '2' },
      },
    },
  },
  {
    id: '17',
    type: 'song',
    attributes: {
      title: 'How Will I Know',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/4cfd0ab2b770e37313275d37788f687992b0ee17',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '2' },
      },
    },
  },
  {
    id: '18',
    type: 'song',
    attributes: {
      title: 'All at Once',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/96e981cab89eb7349f82ccdd7e32725df82da921',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '2' },
      },
    },
  },
  {
    id: '19',
    type: 'song',
    attributes: {
      title: 'Take Good Care of My Heart',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/036cf707cfcbe160bdbf4b3daf6d3f414a54c8ef',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '2' },
      },
    },
  },
  {
    id: '20',
    type: 'song',
    attributes: {
      title: 'Greatest Love of All',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/12144a766d983ea0484b29e7c43e70c4ccf535c3',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '2' },
      },
    },
  },
  {
    id: '21',
    type: 'song',
    attributes: {
      title: 'Hold Me',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/b0e38be6526ec0ea7b315884873d77611a438f40',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '2' },
      },
    },
  },
  {
    id: '22',
    type: 'song',
    attributes: {
      title: "It's Not Right But It's Okay",
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/73cdb98b6f4157d0f0ae1950366b022fcfa9a391',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '23',
    type: 'song',
    attributes: {
      title: 'Heartbreak Hotel',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/4daf3565cae4f18ef9c9700ad9c162596e8eec71',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '24',
    type: 'song',
    attributes: {
      title: 'My Love Is Your Love',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/9a265fe7b4388ee91fc80a122c5ff685259a678d',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '25',
    type: 'song',
    attributes: {
      title: 'When You Believe',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/6bddbd827f3ae93db987505fd9c0da210a980e6e',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '26',
    type: 'song',
    attributes: {
      title: 'If I Told You That',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/d2e60e8f12e7ac462090f41d64ddaa5ae40b51e6',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '27',
    type: 'song',
    attributes: {
      title: 'In My Business',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/43888eaed49ad7fb8d81cded083d7b62589a5cf3',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '28',
    type: 'song',
    attributes: {
      title: 'I Learned from the Best',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/e0f61b4d8709e6d9ba7e65b117ed036bd04de16b',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '29',
    type: 'song',
    attributes: {
      title: 'Oh Yes',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/56b2ed7e5740656a430a138ae6d07ad69cc01d4a',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '30',
    type: 'song',
    attributes: {
      title: 'Get It Back',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/5b5a25efb1c9a967a4174679d35cefc1b0a9d59f',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '31',
    type: 'song',
    attributes: {
      title: 'Until You Come Back',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/ccfe060756207827ca2a94273a295f39ec319332',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '32',
    type: 'song',
    attributes: {
      title: 'I Bow Out',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/eadbf7e5b6573e7bd9e857960b4f565ca158954a',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '33',
    type: 'song',
    attributes: {
      title: "You'll Never Stand Alone",
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/a20cd3990cdc5e10d7a8b487a103aa76c60a717a',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
    },
  },
  {
    id: '34',
    type: 'song',
    attributes: {
      title: 'I Was Made To Love Him',
      duration: 30000,
      'mp3-url':
        'https://p.scdn.co/mp3-preview/decd5000c37284d7718d8e504013b035abfcc367',
    },
    relationships: {
      album: {
        data: { type: 'albums', id: '3' },
      },
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

  songsRouter.get('/:id', function (req, res) {
    let song = SONGS.find((song) => song.id === req.params.id);

    delayedResponse(res, {
      data: song,
    });
  });

  app.use('/api/songs', songsRouter);
};
