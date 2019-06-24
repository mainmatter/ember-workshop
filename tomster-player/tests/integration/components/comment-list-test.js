import EmberObject from '@ember/object';
import { makeArray } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | comment list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    const comments = makeArray([
      EmberObject.create({
        id: 1,
        text: 'great song!',
        rating: 5,
        createdAt: new Date(2014, 6, 6)
      }),
      EmberObject.create({
        id: 2,
        text: 'meh…',
        rating: 1,
        createdAt: new Date(2015, 6, 6)
      })
    ]);
    this.set('comments', comments);
  });

  test('renders all comments sorted by descending creation date', async function(assert) {
    await render(hbs`{{comment-list comments=(readonly comments)}}`);

    assert.dom('*[data-element-type="comment"]').exists({ count: 2 });
    assert.ok(this.$('*[data-element-type="comment"]:first').text().includes('meh…'));
    assert.ok(this.$('*[data-element-type="comment"]:last').text().includes('great song!'));
  });
});
