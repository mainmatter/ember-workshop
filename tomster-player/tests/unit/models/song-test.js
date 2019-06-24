import { get } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | song', function(hooks) {
  setupTest(hooks);

  test('belongs to an album', function(assert) {
    const Song = this.owner.lookup('service:store').modelFor('song');
    const relationship = get(Song, 'relationshipsByName').get('album');

    assert.equal(relationship.kind, 'belongsTo');
  });
});
