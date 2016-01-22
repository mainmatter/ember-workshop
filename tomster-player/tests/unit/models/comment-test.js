import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

const { get } = Ember;

moduleForModel('comment', 'Unit | Model | comment', {
  needs: ['model:album']
});

test('belongs to an album', function(assert) {
  const Comment = this.store().modelFor('comment');
  const relationship = get(Comment, 'relationshipsByName').get('album');

  assert.equal(relationship.kind, 'belongsTo');
});
