import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Pretender from 'pretender';
import { authenticateSession, invalidateSession } from 'ember-simple-auth/test-support';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.server = new Pretender(function() {
      this.get('/api/albums', () => {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ data: [] })];
      });
    });
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  module('when the session is authenticated', function(hooks) {
    hooks.beforeEach(function() {
      authenticateSession();
    });

    test('visiting / redirects to library', async function(assert) {
      await visit('/');

      assert.equal(currentURL(), '/library');
    });
  });

  module('when the session is not authenticated', function(hooks) {
    hooks.beforeEach(function() {
      invalidateSession();
    });

    test('visiting / redirects to /login', async function(assert) {
      await visit('/');

      assert.equal(currentURL(), '/login');
    });
  });
});
