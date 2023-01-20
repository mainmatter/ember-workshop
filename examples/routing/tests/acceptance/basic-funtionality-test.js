import { module, test } from "qunit";
import {
  click,
  visit,
  currentRouteName,
  currentURL,
} from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | basic funtionality", function (hooks) {
  setupApplicationTest(hooks);

  test("listing and selecting a medium", async function (assert) {
    await visit("/media");
    assert.strictEqual(document.querySelectorAll(".media-link").length, 3);

    await click(document.querySelector(".movies-link"));
    assert.strictEqual(currentURL(), "/media?filter=movies");
    assert.strictEqual(document.querySelectorAll(".media-link").length, 7);

    await click(document.querySelectorAll(".media-link")[6]);
    assert.strictEqual(currentURL(), "/media/6?filter=movies");
  });

  test("shows the not-found route for non existent routes", async function (assert) {
    await visit("/i-do-not-exist");

    assert.strictEqual(currentRouteName(), "not-found");
    assert.strictEqual(
      document.querySelector(".not-found-title").textContent,
      "Not Found"
    );
    assert.strictEqual(
      document.querySelector(".not-found-description").textContent,
      "The page you were looking for could not be found."
    );
  });
});
