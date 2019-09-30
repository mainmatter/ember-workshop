import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | format-duration', function(hooks) {
  setupRenderingTest(hooks);

  test('it formats a duration in milliseconds', async function(assert) {
    this.set('duration', 30000);

    await render(hbs`{{format-duration duration}}`);

    assert.equal(this.element.textContent.trim(), '00:30');
  });
});
