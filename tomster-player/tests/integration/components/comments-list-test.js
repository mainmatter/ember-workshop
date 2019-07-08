import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | comments-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.comments = [
      {
        rating: 1,
        text: 'Not actually my favorite…',
        'created-at': new Date(2016, 0, 10, 12, 34),
      },
      {
        rating: 5,
        text: 'Such a great album - a total christmas classic for me!',
        'created-at': new Date(2015, 11, 24, 18, 5),
      },
    ];
  });

  test('it renders all comments', async function (assert) {
    await render(hbs`<CommentsList @comments={{this.comments}} />`);

    assert.dom('.card').exists({ count: 2 });
    assert.dom(this.element).containsText('Not actually my favorite…');
    assert
      .dom(this.element)
      .containsText('Such a great album - a total christmas classic for me!');
  });
});
