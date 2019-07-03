import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | media/medium', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:media/medium');
    assert.ok(route);
  });
});
