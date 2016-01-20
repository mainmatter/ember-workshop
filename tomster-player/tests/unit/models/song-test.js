import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

const { get } = Ember;

moduleForModel('song', 'Unit | Model | song', {
  needs: ['model:album']
});

test('belongs to an album', function(assert) {
  const Song = this.store().modelFor('song');
  const relationship = get(Song, 'relationshipsByName').get('album');

  assert.equal(relationship.kind, 'belongsTo');
});
