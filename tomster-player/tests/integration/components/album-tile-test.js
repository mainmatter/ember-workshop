import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | album-tile', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.album = {
      title: 'The Bodyguard',
      coverUrl: 'https://cover.url/of-the-album.png',
      songs: [
        {
          title: 'I Will Always Love You',
          duration: 35400,
        },
        {
          title: 'Even If My Heart Would Break',
          duration: 124564,
        },
      ],
      comments: [
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
      ],
    };
  });

  test('it renders the album title', async function (assert) {
    await render(hbs`<AlbumTile @album={{this.album}} />`);

    assert.dom(this.element).containsText('The Bodyguard');
  });

  test('it renders the average rating', async function (assert) {
    await render(hbs`<AlbumTile @album={{this.album}} />`);

    assert.strictEqual(this.element.textContent.match(/⭐️/g).length, 3);
  });

  test('it renders the album cover', async function (assert) {
    await render(hbs`<AlbumTile @album={{this.album}} />`);

    assert.dom('img[src="https://cover.url/of-the-album.png"]').exists();
  });

  test('it renders all songs', async function (assert) {
    await render(hbs`<AlbumTile @album={{this.album}} />`);

    assert.dom('ol li').exists({ count: 2 });
    assert.dom(this.element).containsText('I Will Always Love You');
    assert.dom(this.element).containsText('00:35');
    assert.dom(this.element).containsText('Even If My Heart Would Break');
    assert.dom(this.element).containsText('20:50');
  });
});
