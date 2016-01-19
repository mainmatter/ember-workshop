import Ember from 'ember';
import delayedPromise from '../../utils/delayed-promise';

export default Ember.Route.extend({
  model(params) {
    const title = `The individual medium for ID ${params.mediumId}`;

    return delayedPromise({ title });
  }
});
