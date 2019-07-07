import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | albums', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /library renders albums', async function(assert) {
    await visit('/library');

    assert.equal(currentURL(), '/library');
    assert.equal(this.element.querySelectorAll('.list-group-item').length, 2);
  });

  test('visiting /library shows a message to select an album', async function(assert) {
    await visit('/library');

    assert.ok(this.element.textContent.includes('Please select an album'));
  });
});
