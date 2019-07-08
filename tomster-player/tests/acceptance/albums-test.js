import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Pretender from 'pretender';

module('Acceptance | albums', function (hooks) {
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
                    data: [],
                  },
                },
              },
            ],
          }),
        ];
      });
    });
  });

  hooks.afterEach(function () {
    this.server.shutdown();
  });

  test('visiting /library renders albums', async function (assert) {
    await visit('/library');

    assert.strictEqual(currentURL(), '/library');
    assert.dom('.list-group-item').exists({ count: 2 });
  });

  test('visiting /library shows a message to select an album', async function (assert) {
    await visit('/library');

    assert.dom(this.element).containsText('Please select an album');
  });
});
