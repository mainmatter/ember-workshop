import Route from '@ember/routing/route';
import data from '../lib/data';

export default Route.extend({
  model() {
    return data;
  }
});
