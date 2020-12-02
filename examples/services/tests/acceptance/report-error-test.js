import { module, test } from "qunit";
import { click, fillIn, visit } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | report error", function (hooks) {
  setupApplicationTest(hooks);

  test("reporting an error", async function (assert) {
    await visit("/errors");
    assert.dom("[data-test-error-count]").hasText("0 Error(s)");

    await fillIn("[data-test-textarea]", "the roof is on fire");
    await click("[data-test-submit-btn]");

    assert.dom("[data-test-error-count]").hasText("1 Error(s)");
    let errorItems = document.querySelectorAll("[data-test-error-item]");
    assert.equal(errorItems.length, 1);
    assert.dom(errorItems[0]).hasText("the roof is on fire");

    assert.dom("[data-test-textarea]").hasText("");

    await fillIn("[data-test-textarea]", "we don't need no water");
    await click("[data-test-submit-btn]");

    assert.dom("[data-test-error-count]").hasText("2 Error(s)");
    errorItems = document.querySelectorAll("[data-test-error-item]");
    assert.equal(document.querySelectorAll("[data-test-error-item]").length, 2);
    assert.dom(errorItems[1]).hasText("we don't need no water");
  });
});
