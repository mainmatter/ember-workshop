import { moduleForModel, test } from 'ember-qunit';

moduleForModel('song', 'Unit | Model | song', {
  needs: ['model:album']
});

test('belongs to an album', function(assert) {
  const Song = this.store().modelFor('song');
  const relationship = Ember.get(Song, 'relationshipsByName').get('album');

  assert.equal(relationship.kind, 'belongsTo');
});
