import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | album-tile', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('album', {
      title: 'The Bodyguard',
      coverUrl: 'https://cover.url/of-the-album.png',
      songs: [
        {
          title: 'I Will Always Love You',
          duration: 35400
        },
        {
          title: 'Even If My Heart Would Break',
          duration: 124564
        },
      ],
      comments: [
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
      ]
    })
  });

  test('it renders the album title', async function(assert) {
    await render(hbs`<AlbumTile @album={{album}} />`);

    assert.ok(this.element.textContent.includes, 'The Bodyguard');
  });

  test('it renders the average rating', async function(assert) {
    await render(hbs`<AlbumTile @album={{album}} />`);

    assert.equal(this.element.textContent.match(/⭐️/g).length, 3);
  });

  test('it renders the album cover', async function(assert) {
    await render(hbs`<AlbumTile @album={{album}} />`);

    assert.equal(this.element.querySelectorAll('img[src="https://cover.url/of-the-album.png"]').length, 1);
  });

  test('it renders all songs', async function(assert) {
    await render(hbs`<AlbumTile @album={{album}} />`);

    assert.equal(this.element.querySelectorAll('ol li').length, 2);
    assert.ok(this.element.textContent.includes('I Will Always Love You'));
    assert.ok(this.element.textContent.includes('00:35'));
    assert.ok(this.element.textContent.includes('Even If My Heart Would Break'));
    assert.ok(this.element.textContent.includes('20:50'));
  });
});
