import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | albums', function (hooks) {
  setupApplicationTest(hooks);

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
