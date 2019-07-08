import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | comments-list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('comments', [
      {
        rating: 1,
        text: 'Not actually my favorite…',
        'created-at': new Date(2016, 0, 10, 12, 34)
      },
      {
        rating: 5,
        text: 'Such a great album - a total christmas classic for me!',
        'created-at': new Date(2015, 11, 24, 18, 5)
      }
    ]);
  });

  test('it renders all comments', async function(assert) {
    await render(hbs`<CommentsList @comments={{comments}} />`);

    assert.equal(this.element.querySelectorAll('.card').length, 2);
    assert.ok(this.element.textContent.includes('Not actually my favorite…'));
    assert.ok(this.element.textContent.includes('Such a great album - a total christmas classic for me!'));
  });
});
