import { module, test } from "qunit";
import { visit } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | smoke test", function (hooks) {
  setupApplicationTest(hooks);

  test("visiting /", async function (assert) {
    await visit("/");
    let faIcons = document.querySelectorAll(".font-awesome-paragraph svg");
    assert.strictEqual(faIcons.length, 3, "it renders the fa icons");

    assert
      .dom("[data-highcharts-chart]")
      .exists("it initialises the highcharts chart");
  });
});
