import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('comment-list', 'Integration | Component | comment list', {
  integration: true,

  beforeEach() {
    const comments = Ember.makeArray([
      Ember.Object.create({
        id: 1,
        text: 'great song!',
        rating: 5,
        createdAt: new Date(2014, 6, 6)
      }),
      Ember.Object.create({
        id: 2,
        text: 'meh…',
        rating: 1,
        createdAt: new Date(2015, 6, 6)
      })
    ]);
    this.set('comments', comments);
  }
});

test('renders all comments sorted by descending creation date', function(assert) {
  this.render(hbs`{{comment-list comments=(readonly comments)}}`);

  assert.equal(this.$('*[data-element-type="comment"]').length, 2);
  assert.ok(this.$('*[data-element-type="comment"]:first').text().includes('meh…'));
  assert.ok(this.$('*[data-element-type="comment"]:last').text().includes('great song!'));
});
