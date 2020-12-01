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
    assert.equal(document.querySelectorAll(".media-link").length, 3);

    await click(document.querySelector(".movies-link"));
    assert.equal(currentURL(), "/media?filter=movies");
    assert.equal(document.querySelectorAll(".media-link").length, 7);

    await click(document.querySelectorAll(".media-link")[6]);
    assert.equal(currentURL(), "/media/6?filter=movies");
  });

  test("shows the not-found route for non existent routes", async function (assert) {
    await visit("/i-do-not-exist");

    assert.equal(currentRouteName(), "not-found");
    assert.equal(
      document.querySelector(".not-found-title").textContent,
      "Not Found"
    );
    assert.equal(
      document.querySelector(".not-found-description").textContent,
      "The page you were looking for could not be found."
    );
  });
});
