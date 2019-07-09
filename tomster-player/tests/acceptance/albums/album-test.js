import { module, test } from 'qunit';
import {
  visit,
  currentURL,
  fillIn,
  click,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Pretender from 'pretender';
import {
  authenticateSession,
  invalidateSession,
} from 'ember-simple-auth/test-support';

module('Acceptance | albums/album', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    this.server = new Pretender(function () {
      this.get('/api/albums', () => {
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({
            data: [
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
                    ],
                  },
                  comments: {
                    data: [{ type: 'comments', id: '1' }],
                  },
                },
              },
            ],
          }),
        ];
      });
      this.get('/api/songs/1', () => {
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({
            data: {
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
          }),
        ];
      });
      this.get('/api/songs/2', () => {
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({
            data: {
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
          }),
        ];
      });
      this.get('/api/comments/1', () => {
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({
            data: {
              id: '1',
              type: 'comment',
              attributes: {
                rating: 1,
                text: 'Not actually my favorite…',
                'created-at': new Date(2016, 0, 10, 12, 34),
              },
              relationships: {
                album: {
                  data: { type: 'album', id: '1' },
                },
              },
            },
          }),
        ];
      });
      this.post('/api/comments', () => {
        return [
          201,
          { 'Content-Type': 'application/json' },
          JSON.stringify({
            data: {
              id: '3',
              type: 'comment',
              attributes: {
                rating: 5,
                text: 'I love this!',
                'created-at': new Date(),
              },
              relationships: {
                album: {
                  data: { type: 'album', id: '1' },
                },
              },
            },
          }),
        ];
      });
    });
  });

  hooks.afterEach(function () {
    this.server.shutdown();
  });

  module('when the session is authenticated', function (hooks) {
    hooks.beforeEach(function () {
      authenticateSession();
    });

    test('visiting /library/1 renders an album', async function (assert) {
      await visit('/library/1');

      assert.strictEqual(currentURL(), '/library/1');
      assert.dom('[data-test-album-title]').includesText('The Bodyguard');
      assert.dom('[data-test-song]').exists({ count: 2 });
      assert.dom('[data-test-comment]').exists();
    });

    test('visiting /library/1 allows commmenting on the album', async function (assert) {
      await visit('/library/1');

      assert.strictEqual(currentURL(), '/library/1');
      assert.dom('[data-test-comment]').exists({ count: 1 });

      await fillIn('[data-test-new-comment-rating-input]', 5);
      await fillIn('[data-test-new-comment-text-input]', 'I love this!');
      await triggerKeyEvent('[data-test-new-comment-text-input]', 'keyup', '!');
      await click('[data-test-new-comment-submit]');

      assert.dom('[data-test-comment]').exists({ count: 2 });
    });
  });

  module('when the session is not authenticated', function (hooks) {
    hooks.beforeEach(function () {
      invalidateSession();
    });

    test('visiting /library/1 redirects to /login', async function (assert) {
      await visit('/library/1');

      assert.strictEqual(currentURL(), '/login');
    });
  });
});
