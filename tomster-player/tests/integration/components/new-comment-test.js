import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';
import Pretender from 'pretender';

moduleForComponent('new-comment', 'Integration | Component | new comment', {
  integration: true,

  beforeEach() {
    this.inject.service('store');
    this.server = new Pretender(function() {
      this.post('/api/albums', function() {
        return [204, {}, ''];
      });
      this.post('/api/comments', function() {
        return [204, {}, ''];
      });
    });

    Ember.run(() => {
      const store = this.get('store');
      const album = store.createRecord('album');
      this.set('album', album);
    });
  }
});

test('it creates a comment', function(assert) {
  return Ember.run(() => {
    return this.get('album').save().then(() => {
      this.on('endCommenting', () => {
        assert.ok(true);
      });

      this.render(hbs`{{new-comment album=(readonly album) on-created=(action 'endCommenting') on-cancel=(action 'endCommenting')}}`);
      this.$('*[data-element-type="comment-form"] select').val(5);
      this.$('*[data-element-type="comment-form"] textarea').val('great song!');
      this.$('*[data-element-type="comment-form"] button[type="submit"]').click();

      return wait();
    });
  });
});

test('it does not create a comment when the server rejects it', function(assert) {
  assert.expect(0);
  this.server.post('/api/comments', function() {
    return [422, {}, ''];
  });

  return Ember.run(() => {
    return this.get('album').save().then(() => {
      this.on('endCommenting', () => {
        assert.ok(false);
      });

      this.render(hbs`{{new-comment album=(readonly album) on-created=(action 'endCommenting') on-cancel=(action 'endCommenting')}}`);
      this.$('*[data-element-type="comment-form"] button[type="submit"]').click();

      return wait();
    });
  });
});

test('it cancels creating a comment', function(assert) {
  this.on('endCommenting', () => {
    assert.ok(true);
  });

  this.render(hbs`{{new-comment on-cancel=(action 'endCommenting')}}`);
  this.$('*[data-element-type="comment-form"] *[data-element-type="cancel-button"]').click();
});
