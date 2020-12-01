import { later } from "@ember/runloop";
import config from "routing/config/environment";

const { MIN_DELAY, MAX_DELAY } = config;

export default function delayedResponse(response) {
  return new Promise((resolve) => {
    const delay =
      Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY)) + MIN_DELAY;
    later(null, resolve, response, delay);
  });
}
