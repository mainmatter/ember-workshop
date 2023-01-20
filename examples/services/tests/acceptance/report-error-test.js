import { module, test } from 'qunit';
import { click, fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | report error', function (hooks) {
  setupApplicationTest(hooks);

  test('reporting an error', async function (assert) {
    await visit('/errors');
    assert.dom('.error-count').hasText('0 Error(s)');

    await fillIn('.textarea', 'the roof is on fire');
    await click('.submit-btn');

    assert.dom('.error-count').hasText('1 Error(s)');
    let errorItems = document.querySelectorAll('.error-item');
    assert.strictEqual(errorItems.length, 1);
    assert.dom(errorItems[0]).hasText('the roof is on fire');

    assert.dom('.textarea').hasText('');

    await fillIn('.textarea', "we don't need no water");
    await click('.submit-btn');

    assert.dom('.error-count').hasText('2 Error(s)');
    errorItems = document.querySelectorAll('.error-item');
    assert.strictEqual(document.querySelectorAll('.error-item').length, 2);
    assert.dom(errorItems[1]).hasText("we don't need no water");
  });
});
