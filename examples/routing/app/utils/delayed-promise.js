import Ember from 'ember';

const { RSVP, run: { later } } = Ember;

const MIN_DELAY = 1;
const MAX_DELAY = 3000;

export default function delayedPromise(data) {
  return new RSVP.Promise((resolve) => {
    const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY)) + MIN_DELAY;
    later(null, resolve, data, delay);
  });
}
