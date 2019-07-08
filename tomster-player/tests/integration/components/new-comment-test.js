import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, triggerKeyEvent, click } from '@ember/test-helpers';
import Pretender from 'pretender';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | new-comment', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.server = new Pretender(function() {
      this.post('/api/comments', () => {
        return [201, { 'Content-Type': 'application/json' }, JSON.stringify({
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
        })];
      });
    });
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  test('it renders a comment form', async function(assert) {
    await render(hbs`<NewComment />`);

    assert.ok(this.element.querySelector('form'));
    assert.ok(this.element.querySelector('select'));
    assert.ok(this.element.querySelector('input[type="text"]'));
    assert.ok(this.element.querySelector('button[type="submit"]'));
  });

  test('it disables the submit button when nothing has been entered', async function(assert) {
    await render(hbs`<NewComment />`);

    assert.ok(this.element.querySelector('button[type="submit"]').disabled);
  });

  test('it enables the submit button when nothing has been entered', async function(assert) {
    await render(hbs`<NewComment />`);
    await fillIn('select', 3);
    await fillIn('input[type="text"]', 'yeah, ok…');
    await triggerKeyEvent('#text-input', 'keyup', '…');
    
    assert.ok(!this.element.querySelector('button[type="submit"]').disabled);
  });

  test('it resets fields once the comment has been saved', async function(assert) {
    await render(hbs`<NewComment />`);
    await fillIn('select', 3);
    await fillIn('input[type="text"]', 'yeah, ok…');
    await triggerKeyEvent('#text-input', 'keyup', '…');
    await click('button[type="submit"]');
    
    assert.equal(this.element.querySelector('select').value, '');
    assert.equal(this.element.querySelector('input[type="text"]').value, '');
  });
});
