import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import Service from '@ember/service';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | play-button', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.song = {
      title: 'Hold Me',
      album: {
        coverUrl: 'https://cover.url/of-the-album.png',
      },
    };
  });

  test('it renders a play button when not playing', async function (assert) {
    await render(hbs`<PlayButton @song={{this.song}} />`);

    assert.dom('[data-test-button]').hasText('▶️');
  });

  test('it renders a stop button when playing the current song', async function (assert) {
    let song = this.song;
    this.owner.register(
      'service:player',
      class MockPlayer extends Service {
        constructor() {
          super(...arguments);

          this.song = song;
          this.isPlaying = true;
        }
      }
    );
    await render(hbs`<PlayButton @song={{this.song}} />`);

    assert.dom('[data-test-button]').hasText('⏹');
  });

  test('clicking the stop button stops the song', async function (assert) {
    assert.expect(1);

    let song = this.song;
    this.owner.register(
      'service:player',
      class MockPlayer extends Service {
        constructor() {
          super(...arguments);

          this.song = song;
          this.isPlaying = true;
        }

        stop() {
          assert.ok(true, 'The stop method was called.');
        }
      }
    );
    await render(hbs`<PlayButton @song={{this.song}} />`);
    await click('[data-test-button]');
  });

  test('it renders a play button when playing a different song', async function (assert) {
    this.owner.register(
      'service:player',
      class MockPlayer extends Service {
        constructor() {
          super(...arguments);

          this.song = {
            title: 'Greatest Love of All',
            album: {
              coverUrl: 'https://cover.url/of-the-album.png',
            },
          };
          this.isPlaying = true;
        }
      }
    );
    await render(hbs`<PlayButton @song={{this.song}} />`);

    assert.dom('[data-test-button]').hasText('▶️');
  });

  test('clicking the play button playes the song', async function (assert) {
    assert.expect(1);

    let currentSong = this.song;
    this.owner.register(
      'service:player',
      class MockPlayer extends Service {
        play(song) {
          assert.strictEqual(
            song,
            currentSong,
            'The play method was called with the song to play.'
          );
        }
      }
    );

    await render(hbs`<PlayButton @song={{this.song}} />`);
    await click('[data-test-button]');
  });
});
