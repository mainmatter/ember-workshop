import Ember from 'ember';
import data from '../lib/data';

export default Ember.Route.extend({
  model() {
    return data;
  }
});
