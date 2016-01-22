import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const PlayerStub = Ember.Service.extend(Ember.Evented, {
  play(song) {
    this.trigger('play', song);
  }
});

moduleForComponent('play-icon', 'Integration | Component | play icon', {
  integration: true,

  beforeEach() {
    const song = Ember.Object.create({
      title: 'Whitney Houston',
      mp3Url: 'http://example.com/song.mp3'
    });
    this.set('song', song);

    this.register('service:player', PlayerStub);
    this.inject.service('player', { as: 'playerService' });
  }
});

test('plays the a song', function(assert) {
  const playerService = this.get('playerService');
  playerService.one('play', (value) => {
    const song = this.get('song');

    assert.deepEqual(value, song);
  });

  this.render(hbs`{{play-icon song=(readonly song)}}`);
  this.$('*[data-element-type="play-button"]').click();
});
