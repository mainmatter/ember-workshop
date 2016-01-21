import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from '../config/environment';

export default JSONAPIAdapter.extend({
  host: config.apiHost,
  namespace: 'api'
});
