import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import Service from '@ember/service';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | player-tile', function(hooks) {
  setupRenderingTest(hooks);

  test('it shows a message to select a song when none has been selected', async function(assert) {
    await render(hbs`<PlayerTile />`);

    assert.ok(this.element.textContent.includes('Select a song'));
  });

  test('it shows the current song if one is selected', async function(assert) {
    this.owner.register('service:player', Service.extend({
      init() {
        this._super(...arguments);

        this.song = {
          title: 'Hold Me',
          album: {
            coverUrl: 'https://cover.url/of-the-album.png',
          }
        };
      }
    }));
    await render(hbs`<PlayerTile />`);

    assert.ok(this.element.textContent.includes('Hold Me'));
    assert.ok(this.element.querySelector('img[src="https://cover.url/of-the-album.png"]'));
  });
});
