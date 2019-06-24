import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, click, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Pretender from 'pretender';

module('Integration | Component | new comment', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(function() {
    this.store = this.owner.lookup('service:store');
    this.server = new Pretender(function() {
      this.post('/api/albums', function() {
        return [201, {}, JSON.stringify({
          data: {
            id: '1',
            type: 'albums'
          }
        })];
      });
      this.post('/api/comments', function() {
        return [201, {}, JSON.stringify({
          data: {
            id: '1',
            type: 'comments'
          }
        })];
      });
    });

    run(() => {
      const store = this.get('store');
      const album = store.createRecord('album');
      this.set('album', album);
    });
  });

  test('it creates a comment', function(assert) {
    return run(() => {
      return this.get('album').save().then(async () => {
        this.actions.endCommenting = () => {
          assert.ok(true);
        };

        await render(
          hbs`{{new-comment album=(readonly album) on-created=(action 'endCommenting') on-cancel=(action 'endCommenting')}}`
        );
        await fillIn('*[data-element-type="comment-form"] select', 5);
        await fillIn('*[data-element-type="comment-form"] textarea', 'great song!');
        await click('*[data-element-type="comment-form"] button[type="submit"]');

        return settled();
      });
    });
  });

  test('it does not create a comment when the server rejects it', function(assert) {
    assert.expect(0);
    this.server.post('/api/comments', function() {
      return [422, {}, ''];
    });

    return run(() => {
      return this.get('album').save().then(async () => {
        this.actions.endCommenting = () => {
          assert.ok(false);
        };

        await render(
          hbs`{{new-comment album=(readonly album) on-created=(action 'endCommenting') on-cancel=(action 'endCommenting')}}`
        );
        await click('*[data-element-type="comment-form"] button[type="submit"]');

        return settled();
      });
    });
  });

  test('it cancels creating a comment', async function(assert) {
    this.actions.endCommenting = () => {
      assert.ok(true);
    };

    await render(hbs`{{new-comment on-cancel=(action 'endCommenting')}}`);
    await click('*[data-element-type="comment-form"] *[data-element-type="cancel-button"]');
  });
});
