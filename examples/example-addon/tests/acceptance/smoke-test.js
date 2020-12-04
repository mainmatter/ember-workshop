import { module, test } from "qunit";
import { visit } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | smoke", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /", async function (assert) {
    await visit("/");

    assert.dom(".component-a").exists();
    assert
      .dom(".component-a")
      .hasText("This is Component A, defined in the Ember Addon!");
  });
});
