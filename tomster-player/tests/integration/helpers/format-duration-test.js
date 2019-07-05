import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-duration', function (hooks) {
  setupRenderingTest(hooks);

  test('it formats a duration in milliseconds', async function (assert) {
    this.duration = 30000;

    await render(hbs`{{format-duration this.duration}}`);

    assert.dom(this.element).hasText('00:30');
  });
});
