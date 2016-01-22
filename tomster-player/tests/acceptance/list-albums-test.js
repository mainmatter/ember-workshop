import { test } from 'qunit';
import moduleForAcceptance from 'tomster-player/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';
import { authenticateSession } from 'tomster-player/tests/helpers/ember-simple-auth';

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

moduleForAcceptance('Acceptance | list albums', {
  beforeEach() {
    this.server = new Pretender(function() {
      this.get('/api/albums', function() {
        return [200, { 'Content-Type': 'application/vnd.api+json' }, JSON.stringify({ data: ALBUMS })];
      });
    });
    authenticateSession(this.application);
  },

  afterEach() {
    this.server.shutdown();
  }
});

test('visiting / renders all albums', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('*[data-element="album-title"]').length, 2);
    assert.equal(find('*[data-element="album-title"]:contains("The Bodyguard")').length, 1);
    assert.equal(find('*[data-element="album-title"]:contains("Whitney Houston")').length, 1);
  });
});
