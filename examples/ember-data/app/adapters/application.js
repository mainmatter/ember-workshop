import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'https://floating-shelf-13497.herokuapp.com',
  namespace: 'api'
});
