import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';
import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const PlayerStub = Service.extend(Evented, {
  play(song) {
    this.trigger('play', song);
  }
});

module('Integration | Component | play icon', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    const song = EmberObject.create({
      title: 'Whitney Houston',
      mp3Url: 'http://example.com/song.mp3'
    });
    this.set('song', song);

    this.owner.register('service:player', PlayerStub);
    this.playerService = this.owner.lookup('service:player');
  });

  test('plays the a song', async function(assert) {
    const playerService = this.get('playerService');
    playerService.one('play', (value) => {
      const song = this.get('song');

      assert.deepEqual(value, song);
    });

    await render(hbs`{{play-icon song=(readonly song)}}`);
    await click('*[data-element-type="play-button"]');
  });
});
