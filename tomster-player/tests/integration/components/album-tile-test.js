import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | album tile', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(function() {
    const album = EmberObject.create({
      title: 'Whitney Houston',
      coverUrl: 'http://example.com/cover.jpg',
      songs: [
        EmberObject.create({ id: 1 }),
        EmberObject.create({ id: 2 })
      ]
    });
    this.set('album', album);
  });

  test('renders the album title', async function(assert) {
    await render(hbs`{{album-tile album=album}}`);

    assert.dom('*[data-element-type="album-title"]').hasText('Whitney Houston');
  });

  test("renders the album's songs", async function(assert) {
    await render(hbs`{{album-tile album=album show-songs=true}}`);

    assert.dom('*[data-element-type="album-song"]').exists({ count: 2 });
  });

  test("omits songs if 'show-songs' attribute is false", async function(assert) {
    await render(hbs`{{album-tile album=album show-songs=false}}`);

    assert.dom('*[data-element-type="album-song"]').doesNotExist();
  });

  test("renders the album's cover", async function(assert) {
    await render(hbs`{{album-tile album=album}}`);

    assert.dom('img[src="http://example.com/cover.jpg"]').exists({ count: 1 });
  });

  test('renders a rating indicator', async function(assert) {
    await render(hbs`{{album-tile album=album show-songs=true}}`);

    assert.dom('*[data-element-type="album-rating"]').exists({ count: 1 });
  });

  test('calls the action assigned to on-select-album with the album when clicked', async function(assert) {
    this.actions.selectAlbum = (value) => {
      const album = this.get('album');

      assert.deepEqual(value, album);
    };

    await render(hbs`{{album-tile album=album on-select-album=(action 'selectAlbum') id='the-component'}}`);

    await click('#the-component');
  });

  test('does not require an action to be assigned to the on-select-album event', async function(assert) {
    assert.expect(0);

    await render(hbs`{{album-tile album=album id='the-component'}}`);

    await click('#the-component');
  });
});
