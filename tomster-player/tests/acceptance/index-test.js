import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting / renders the index page', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.equal(this.element.querySelectorAll('h4').length, 2, '2 albums are rendered.');
    assert.equal(this.element.querySelectorAll('ol > li').length, 20, '20 songs are rendered.');
  });
});
