import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import Pretender from 'pretender';
import { authenticateSession } from 'ember-simple-auth/test-support';

const ALBUMS = [{
  id: '1',
  type: 'album',
  attributes: {
    title: 'The Bodyguard',
    'cover-url': 'https://i.scdn.co/image/7bcb439989b592287aeac1599aaa36be17672b73'
  }
},
{
  id: '2',
  type: 'album',
  attributes: {
    title: 'Whitney Houston',
    'cover-url': 'https://i.scdn.co/image/3c61cf6b053cea492f3962b0b005b4e170afa37a'
  }
}];

module('Acceptance | list albums', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    this.server = new Pretender(function() {
      this.get('/api/albums', function() {
        return [200, { 'Content-Type': 'application/vnd.api+json' }, JSON.stringify({ data: ALBUMS })];
      });

      this.get('/api/songs/:id', function(req) {
        return [200, { 'Content-Type': 'application/vnd.api+json' }, JSON.stringify({ data: { id: req.params.id, type: 'songs' } })];
      });
    });
    authenticateSession(this.application);
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  test('visiting / renders all albums', async function(assert) {
    await visit('/');

    assert.dom('*[data-element-type="album-title"]').exists({ count: 2 });
    assert.dom('*[data-album-title="The Bodyguard"]').containsText('The Bodyguard');
    assert.dom('*[data-album-title="Whitney Houston"]').containsText('Whitney Houston');
  });
});
