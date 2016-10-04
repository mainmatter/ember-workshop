import { test } from 'qunit';
import moduleForAcceptance from 'tomster-player/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'tomster-player/tests/helpers/ember-simple-auth';
import { loadFixtures, unloadFixtures, fixtures } from 'tomster-player/tests/helpers/ember-cli-fortune';

moduleForAcceptance('Acceptance | list albums', {
  beforeEach(assert) {
    const done = assert.async();
    authenticateSession(this.application);
    loadFixtures(fixtures)
    .then(done);
  },

  afterEach(assert) {
    const done = assert.async();
    unloadFixtures()
    .then(done);
  }
});

test('visiting / renders all albums', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('*[data-element-type="album-title"]').length, 3);
    assert.equal(find('*[data-element-type="album-title"]:contains("The Bodyguard")').length, 1);
    assert.equal(find('*[data-element-type="album-title"]:contains("Whitney Houston")').length, 1);
    assert.equal(find('*[data-element-type="album-title"]:contains("My Love Is Your Love")').length, 1);
  });
});
