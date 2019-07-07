import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | albums/album', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /library/1 renders an album', async function(assert) {
    await visit('/library/1');

    assert.equal(currentURL(), '/library/1');
    assert.ok(this.element.querySelector('h4').textContent.includes('The Bodyguard'));
    assert.equal(this.element.querySelectorAll('ol li').length, 11);
  });
});
