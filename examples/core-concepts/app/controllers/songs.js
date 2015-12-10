import Ember from 'ember';

export default Ember.Controller.extend({
  songCount: Ember.computed.alias('model.length')
});
