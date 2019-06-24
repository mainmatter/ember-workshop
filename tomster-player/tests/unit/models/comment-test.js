import { get } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | comment', function(hooks) {
  setupTest(hooks);

  test('belongs to an album', function(assert) {
    const Comment = this.owner.lookup('service:store').modelFor('comment');
    const relationship = get(Comment, 'relationshipsByName').get('album');

    assert.equal(relationship.kind, 'belongsTo');
  });
});
