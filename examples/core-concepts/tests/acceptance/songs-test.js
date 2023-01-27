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
              "cover-url": "https://upload.wikimedia.org/wikipedia/en/0/03/Whitney_Houston_-_The_Bodyguard.png"
            }
          },
          {
            id: "2",
            type: "song",
            attributes: {
              name: "The Greatest Love of All",
              "cover-url": "https://upload.wikimedia.org/wikipedia/en/9/96/Whitney_Houston%2C_Self_Titled.png"
            }
          }
        ]
      })];
    });
    await visit('/songs');

    assert.strictEqual(currentURL(), '/songs');
    assert.dom('img[src="https://upload.wikimedia.org/wikipedia/en/0/03/Whitney_Houston_-_The_Bodyguard.png"]').exists();
    assert.dom('img[src="https://upload.wikimedia.org/wikipedia/en/9/96/Whitney_Houston%2C_Self_Titled.png"]').exists();
    assert.dom('ul li.song').exists({ count: 2 });
    assert.dom(this.element).containsText('I will always love you');
    assert.dom(this.element).containsText('The Greatest Love of All');
  });
});
