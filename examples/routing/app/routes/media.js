import Route from '@ember/routing/route';
import delayedResponse from '../utils/delayed-response';

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

export default class MediaRoute extends Route {
  async model() {
    let [albums, movies] = await Promise.all([
      delayedResponse(ALBUMS),
      delayedResponse(MOVIES)
    ]);

    return { albums, movies };
  }
}
