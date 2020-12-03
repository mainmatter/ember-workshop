import { module, test } from "qunit";
import { click, triggerEvent, visit } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | smoke", function (hooks) {
  setupApplicationTest(hooks);

  test("basic test", async function (assert) {
    await visit("/");

    await click(".song-link");
    assert.dom(".song-count").hasText("3 songs");

    let songTiles = document.querySelectorAll(".song-tile");
    assert.equal(songTiles.length, 3, "displays 3 songs tiles");

    let deleteBtns = document.querySelectorAll(".delete-btn");
    assert.equal(deleteBtns.length, 3, "displays 3 delete buttons");

    await click(deleteBtns[0]);
    assert.dom(".song-count").hasText("2 songs");

    songTiles = document.querySelectorAll(".song-tile");
    assert.equal(songTiles.length, 2, "displays 2 songs tiles");

    assert.dom(".list-view-item.active-item").doesNotExist();
    await triggerEvent(songTiles[0], "dblclick");
    assert.dom(".list-view-item.active-item").exists();
  });
});
