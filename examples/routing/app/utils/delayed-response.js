import { later } from '@ember/runloop';

const MIN_DELAY = 1;
const MAX_DELAY = 3000;

export default function delayedResponse(response) {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY)) + MIN_DELAY;
    later(null, resolve, response, delay);
  });
}
