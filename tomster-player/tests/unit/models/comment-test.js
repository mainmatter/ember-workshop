import { moduleForModel, test } from 'ember-qunit';

moduleForModel('comment', 'Unit | Model | comment', {
  needs: ['model:album']
});

test('belongs to an album', function(assert) {
  const Comment = this.store().modelFor('comment');
  const relationship = Ember.get(Comment, 'relationshipsByName').get('album');

  assert.equal(relationship.kind, 'belongsTo');
});
