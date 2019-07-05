import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting / renders the index page', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('h4').exists({ count: 2 });
    assert.dom('ol > li').exists({ count: 20 });
  });
});
