import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import Pretender from 'pretender';

const { RSVP } = Ember;

moduleForModel('album', 'Unit | Model | album', {
  needs: ['model:song', 'model:comment'],

  beforeEach() {
    this.server = new Pretender();
  },

  afterEach() {
    this.server.shutdown();
  }
});

test('has many songs', function(assert) {
  const Album = this.store().modelFor('album');
  const relationship = Ember.get(Album, 'relationshipsByName').get('songs');

  assert.equal(relationship.kind, 'hasMany');
});

test('has many comments', function(assert) {
  const Album = this.store().modelFor('album');
  const relationship = Ember.get(Album, 'relationshipsByName').get('comments');

  assert.equal(relationship.kind, 'hasMany');
});

test('calculates its average rating based on the assigned comments', function(assert) {
  const store = this.store();
  const album = this.subject();
  this.server.post('/comments', function() {
    return [201, {}, JSON.stringify({
      data: {
        id: '1',
        type: 'comments'
      }
    })];
  });

  return Ember.run(() => {
    const comment1 = store.createRecord('comment', { album, rating: 1 });
    const comment2 = store.createRecord('comment', { album, rating: 5 });
    store.createRecord('comment', { album, rating: 5 });

    return RSVP.all([comment1.save(), comment2.save()]).then(() => {
      const averageRating = album.get('averageRating');

      assert.equal(averageRating, 3);
    });
  });
});
