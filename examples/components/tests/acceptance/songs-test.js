import { module, test } from 'qunit';
import { visit, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Pretender from 'pretender';

module('Acceptance | songs', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    this.server = new Pretender();
  });

  hooks.afterEach(function () {
    this.server.shutdown();
  });

  test('visiting /songs renders songs ordered by rating', async function (assert) {
    this.server.get('/api/songs', () => {
      return [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          data: [
            {
              id: '1',
              type: 'song',
              attributes: {
                name: 'I will always love you',
                'cover-url':
                  'https://upload.wikimedia.org/wikipedia/en/0/03/Whitney_Houston_-_The_Bodyguard.png',
                rating: 1,
              },
            },
            {
              id: '2',
              type: 'song',
              attributes: {
                name: 'The Greatest Love of All',
                'cover-url':
                  'https://upload.wikimedia.org/wikipedia/en/9/96/Whitney_Houston%2C_Self_Titled.png',
                rating: 3,
              },
            },
          ],
        }),
      ];
    });
    await visit('/songs');

    assert.strictEqual(currentURL(), '/songs');
    assert.dom('h1').hasText('2 songs');
    assert.dom('h4:first-of-type').hasText('The Greatest Love of All');
    assert.dom('h4:last-of-type').hasText('I will always love you');
  });

  test('songs can be re-rated and will reorder accordingly', async function (assert) {
    this.server.get('/api/songs', () => {
      return [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          data: [
            {
              id: '1',
              type: 'song',
              attributes: {
                name: 'I will always love you',
                'cover-url':
                  'https://upload.wikimedia.org/wikipedia/en/0/03/Whitney_Houston_-_The_Bodyguard.png',
                rating: 1,
              },
            },
            {
              id: '2',
              type: 'song',
              attributes: {
                name: 'The Greatest Love of All',
                'cover-url':
                  'https://upload.wikimedia.org/wikipedia/en/9/96/Whitney_Houston%2C_Self_Titled.png',
                rating: 3,
              },
            },
          ],
        }),
      ];
    });
    await visit('/songs');
    await fillIn('select:last-of-type', '5');

    assert.dom('h4:first-of-type').hasText('I will always love you');
    assert.dom('h4:last-of-type').hasText('The Greatest Love of All');
  });
});
