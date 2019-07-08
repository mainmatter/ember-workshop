import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | rating-indicator', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a start for every rating point', async function (assert) {
    await render(hbs`<RatingIndicator @rating="2" />`);

    assert.strictEqual(this.element.textContent.match(/⭐️/g).length, 2);

    await render(hbs`<RatingIndicator @rating="5" />`);

    assert.strictEqual(this.element.textContent.match(/⭐️/g).length, 5);
  });
});
