import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      highcharts: import('highcharts').then(module => module.default)
    });
  }
});
