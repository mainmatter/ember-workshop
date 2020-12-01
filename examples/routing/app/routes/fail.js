import { action } from '@ember/object';
import Route from '@ember/routing/route';

export default class FailRoute extends Route {
  model() {
    return Promise.reject('an error occured!');
  }

  @action
  error(e) {
    //eslint-disable-next-line no-console
    console.error('Routing error:', e);
  }
}
