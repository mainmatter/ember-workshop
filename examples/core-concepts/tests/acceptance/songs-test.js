import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Pretender from 'pretender';

module('Acceptance | songs', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.server = new Pretender();
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  test('visiting /songs renders songs', async function(assert) {
    this.server.get('/api/songs', () => {
      return [200, {"Content-Type": "application/json"}, JSON.stringify({
        data: [
          {
            id: "1",
            type: "song",
            attributes: {
              name: "I will always love you",
              "cover-url": "https://upload.wikimedia.org/wikipedia/en/f/f3/TheBodyguardSoundtrack.jpg"
            }
          },
          {
            id: "2",
            type: "song",
            attributes: {
              name: "The Greatest Love of All",
              "cover-url": "https://upload.wikimedia.org/wikipedia/en/d/d2/Whitney_Houston_-_Whitney_Houston_%28album%29.jpg"
            }
          }
        ]
      })];
    });
    await visit('/songs');

    assert.strictEqual(currentURL(), '/songs');
    assert.dom('img[src="https://upload.wikimedia.org/wikipedia/en/f/f3/TheBodyguardSoundtrack.jpg"]').exists();
    assert.dom('img[src="https://upload.wikimedia.org/wikipedia/en/d/d2/Whitney_Houston_-_Whitney_Houston_%28album%29.jpg"]').exists();
    assert.dom('ul li.song').exists({ count: 2 });
    assert.dom(this.element).containsText('I will always love you');
    assert.dom(this.element).containsText('The Greatest Love of All');
  });
});
