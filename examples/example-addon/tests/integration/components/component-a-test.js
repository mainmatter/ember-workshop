import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | component-a", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(hbs`<ComponentA />`);

    assert.strictEqual(
      this.element.textContent.trim(),
      "This is Component A, defined in the Ember Addon!"
    );
  });
});
