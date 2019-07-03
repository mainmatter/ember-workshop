import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | fail', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:fail');
    assert.ok(route);
  });
});
