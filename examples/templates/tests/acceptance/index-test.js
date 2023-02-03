import { module, test } from 'qunit';
import { visit, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting / works', async function(assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
  });

  test('it prefills the input fields', async function(assert) {
    await visit('/');

    assert.dom('input').hasValue('The Greatest Love of All');
  });

  test('typing in the text field updates the favorite song', async function(assert) {
    await visit('/');
    await fillIn('input', 'Bodyguard');

    assert.dom('dd').hasText('Bodyguard');
  });
});
