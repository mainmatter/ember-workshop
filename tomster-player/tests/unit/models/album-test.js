import { run } from '@ember/runloop';
import { get } from '@ember/object';
import RSVP from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Pretender from 'pretender';

let num = 1;

module('Unit | Model | album', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.server = new Pretender(function() {
      this.post('/api/comments', function() {
        return [200, { 'Content-Type': 'application/vnd.api+json' }, JSON.stringify({ data: { id: num++, type: 'comments'} })];
      });
    });
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  test('has many songs', function(assert) {
    const Album = this.owner.lookup('service:store').modelFor('album');
    const relationship = get(Album, 'relationshipsByName').get('songs');

    assert.equal(relationship.kind, 'hasMany');
  });

  test('has many comments', function(assert) {
    const Album = this.owner.lookup('service:store').modelFor('album');
    const relationship = get(Album, 'relationshipsByName').get('comments');

    assert.equal(relationship.kind, 'hasMany');
  });

  test('calculates its average rating based on the assigned comments', function(assert) {
    const store = this.owner.lookup('service:store');
    const album = run(() => this.owner.lookup('service:store').createRecord('album'));
    this.server.post('/comments', function() {
      return [201, {}, JSON.stringify({
        data: {
          id: '1',
          type: 'comments'
        }
      })];
    });

    return run(() => {
      const comment1 = store.createRecord('comment', { album, rating: 1 });
      const comment2 = store.createRecord('comment', { album, rating: 5 });
      store.createRecord('comment', { album, rating: 5 });

      return RSVP.all([comment1.save(), comment2.save()]).then(() => {
        const averageRating = album.get('averageRating');

        assert.equal(averageRating, 3);
      });
    });
  });
});
