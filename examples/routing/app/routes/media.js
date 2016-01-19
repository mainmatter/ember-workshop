import Ember from 'ember';
import delayedPromise from '../utils/delayed-promise';

const { RSVP } = Ember;

const ALBUMS = [
  { title: 'The Bodyguard' },
  { title: 'Whitney Houston' },
  { title: 'My Love Is Your Love' }
];

const MOVIES = [
  { title: 'Rocky' },
  { title: 'Rocky II' },
  { title: 'Rocky III' },
  { title: 'Rocky IV' },
  { title: 'Rocky V' },
  { title: 'Rocky Balboa' },
  { title: "Creed – Rocky’s Legacy" }
];

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      albums: delayedPromise(ALBUMS),
      movies: delayedPromise(MOVIES)
    });
  }
});
