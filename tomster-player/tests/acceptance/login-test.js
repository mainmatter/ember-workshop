import { module, test } from 'qunit';
import {
  visit,
  currentURL,
  fillIn,
  triggerKeyEvent,
  click,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Pretender from 'pretender';
import {
  authenticateSession,
  invalidateSession,
} from 'ember-simple-auth/test-support';

module('Acceptance | login', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    this.server = new Pretender(function () {
      this.get('/api/albums', () => {
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ data: [] }),
        ];
      });
    });
  });

  hooks.afterEach(function () {
    this.server.shutdown();
  });

  module('when the session is authenticated', function (hooks) {
    hooks.beforeEach(function () {
      authenticateSession();
    });

    test('visiting /login redirects to /library', async function (assert) {
      await visit('/login');

      assert.strictEqual(currentURL(), '/library');
    });
  });

  module('when the session is not authenticated', function (hooks) {
    hooks.beforeEach(function () {
      invalidateSession();

      this.server.post('/token', (request) => {
        if (
          request.requestBody.includes('username=letme') &&
          request.requestBody.includes('password=in')
        ) {
          return [
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify({ access_token: 'secret token!', account_id: 1 }),
          ];
        } else {
          return [
            400,
            { 'Content-Type': 'application/json' },
            JSON.stringify({ error: 'invalid_grant' }),
          ];
        }
      });
    });

    test('logs the user in with the correct credentials', async function (assert) {
      await visit('/');
      await fillIn('[data-test-login-username-input]', 'letme');
      await triggerKeyEvent('[data-test-login-username-input]', 'keyup', 'E');
      await fillIn('[data-test-login-password-input]', 'in');
      await triggerKeyEvent('[data-test-login-password-input]', 'keyup', 'N');
      await click('[data-test-login-submit]');

      assert.strictEqual(currentURL(), '/library');
      assert.dom('[data-test-logout-button]').exists();
    });

    test('shows an error when entering invalid credentials', async function (assert) {
      await visit('/');
      await fillIn('[data-test-login-username-input]', 'letme');
      await triggerKeyEvent('[data-test-login-username-input]', 'keyup', 'E');
      await fillIn(
        '[data-test-login-password-input]',
        'this-is-the-wrong-passowrd!'
      );
      await triggerKeyEvent('[data-test-login-password-input]', 'keyup', 'N');
      await click('[data-test-login-submit]');

      assert.strictEqual(currentURL(), '/login');
      assert.dom('[data-test-login-error]').exists();
    });
  });
});
