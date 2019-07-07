import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | albums/album', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /library/1 renders an album', async function (assert) {
    await visit('/library/1');

    assert.strictEqual(currentURL(), '/library/1');
    assert.dom('h4').containsText('The Bodyguard');
    assert.dom('ol li').exists({ count: 11 });
  });
});
