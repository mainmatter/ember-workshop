import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, triggerKeyEvent, triggerEvent, click } from '@ember/test-helpers';
import Pretender from 'pretender';
import { hbs } from 'ember-cli-htmlbars';

const COMMENT_RESPONSE = JSON.stringify({
  data: {
    id: '3',
    type: 'comment',
    attributes: {
      rating: 5,
      text: 'I love this!',
      'created-at': new Date()
    },
    relationships: {
      album: {
        data: { type: 'album', id: '1' }
      }
    }
  }
});

module('Integration | Component | new-comment', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.server = new Pretender(function() {
      this.post('/api/comments', () => {
        return [201, { 'Content-Type': 'application/json' }, COMMENT_RESPONSE];
      });
    });
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  test('it renders a comment form', async function(assert) {
    await render(hbs`<NewComment />`);

    assert.dom('form').exists();
    assert.dom('[data-test-new-comment-rating-input]').exists();
    assert.dom('[data-test-new-comment-text-input]').exists();
    assert.dom('[data-test-new-comment-submit]').exists();
  });

  test('it does not show the rating field as invalid initially', async function(assert) {
    await render(hbs`<NewComment />`);

    assert.dom('[data-test-new-comment-rating-input]').doesNotHaveClass('is-invalid');
  });

  test('it shows the rating field as invalid on blur when nothing has been entered', async function(assert) {
    await render(hbs`<NewComment />`);
    await triggerEvent('[data-test-new-comment-rating-input]', 'blur');

    assert.dom('[data-test-new-comment-rating-input]').hasClass('is-invalid');
  });

  test('it shows the rating field as invalid on form submission when nothing has been entered', async function(assert) {
    await render(hbs`<NewComment />`);
    await click('[data-test-new-comment-submit]');

    assert.dom('[data-test-new-comment-rating-input]').hasClass('is-invalid');
  });

  test('it does not show the rating field as invalid when something has been entered', async function(assert) {
    await render(hbs`<NewComment />`);
    await fillIn('[data-test-new-comment-rating-input]', 3);

    assert.dom('[data-test-new-comment-rating-input]').doesNotHaveClass('is-invalid');
  });

  test('it does not show the text field as invalid initially', async function(assert) {
    await render(hbs`<NewComment />`);

    assert.dom('[data-test-new-comment-text-input]').doesNotHaveClass('is-invalid');
  });

  test('it shows the text field as invalid on blur when nothing has been entered', async function(assert) {
    await render(hbs`<NewComment />`);
    await triggerEvent('[data-test-new-comment-text-input]', 'blur');

    assert.dom('[data-test-new-comment-text-input]').hasClass('is-invalid');
  });

  test('it shows the text field as invalid on form submission when nothing has been entered', async function(assert) {
    await render(hbs`<NewComment />`);
    await click('[data-test-new-comment-submit]');

    assert.dom('[data-test-new-comment-text-input]').hasClass('is-invalid');
  });

  test('it does not show the text field as invalid when something has been entered', async function(assert) {
    await render(hbs`<NewComment />`);
    await fillIn('[data-test-new-comment-text-input]', 'I like this!');
    await triggerKeyEvent('[data-test-new-comment-text-input]', 'keyup', '…');

    assert.dom('[data-test-new-comment-text-input]').doesNotHaveClass('is-invalid');
  });

  test('it does not trigger a request when nothing has been entered', async function(assert) {
    assert.expect(0);

    this.server.post('/api/comments', () => {
      assert.ok(false);
    });

    await render(hbs`<NewComment />`);
    await click('[data-test-new-comment-submit]');
  });

  test('it creates a comment when something has been entered', async function(assert) {
    assert.expect(1);

    this.server.post('/api/comments', () => {
      assert.ok(true);

      return [201, { 'Content-Type': 'application/json' }, COMMENT_RESPONSE];
    });

    await render(hbs`<NewComment />`);
    await fillIn('[data-test-new-comment-rating-input]', 3);
    await fillIn('[data-test-new-comment-text-input]', 'yeah, ok…');
    await triggerKeyEvent('[data-test-new-comment-text-input]', 'keyup', '…');
    await click('[data-test-new-comment-submit]');
  });

  test('it resets fields once the comment has been saved', async function(assert) {
    await render(hbs`<NewComment />`);
    await fillIn('[data-test-new-comment-rating-input]', 3);
    await fillIn('[data-test-new-comment-text-input]', 'yeah, ok…');
    await triggerKeyEvent('[data-test-new-comment-text-input]', 'keyup', '…');
    await click('[data-test-new-comment-submit]');
    
    assert.dom('[data-test-new-comment-rating-input]').hasValue('');
    assert.dom('[data-test-new-comment-text-input]').hasValue('');
  });
});
