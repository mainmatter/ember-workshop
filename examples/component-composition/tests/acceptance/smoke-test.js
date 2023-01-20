import { module, test } from "qunit";
import { click, triggerEvent, visit } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import Pretender from "pretender";

module("Acceptance | smoke", function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    this.server = new Pretender();
  });

  hooks.afterEach(function () {
    this.server.shutdown();
  });

  test("basic test", async function (assert) {
    this.server.get("/api/songs", () => {
      return [
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({
          data: [
            {
              id: "1",
              type: "song",
              attributes: {
                name: "I will always love you",
                "cover-url":
                  "https://upload.wikimedia.org/wikipedia/en/f/f3/TheBodyguardSoundtrack.jpg",
              },
            },
            {
              id: "2",
              type: "song",
              attributes: {
                name: "The Greatest Love of All",
                "cover-url":
                  "https://upload.wikimedia.org/wikipedia/en/d/d2/Whitney_Houston_-_Whitney_Houston_%28album%29.jpg",
              },
            },
          ],
        }),
      ];
    });

    this.server.delete("/api/songs/:song_id", () => {
      return [204, {}, ""];
    });

    await visit("/");

    await click(".song-link");
    assert.dom(".song-count").hasText("2 songs");

    let songTiles = document.querySelectorAll(".song-tile");
    assert.strictEqual(songTiles.length, 2, "displays 2 songs tiles");

    let deleteBtns = document.querySelectorAll(".delete-btn");
    assert.strictEqual(deleteBtns.length, 2, "displays 2 delete buttons");

    await click(deleteBtns[0]);
    assert.dom(".song-count").hasText("1 songs");

    songTiles = document.querySelectorAll(".song-tile");
    assert.strictEqual(songTiles.length, 1, "displays 1 songs tile");

    assert.dom(".list-view-item.active-item").doesNotExist();
    await triggerEvent(songTiles[0], "dblclick");
    assert.dom(".list-view-item.active-item").exists();
  });
});
