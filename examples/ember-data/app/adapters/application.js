import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  host: 'https://floating-shelf-13497.herokuapp.com',
  namespace: 'api'
});
