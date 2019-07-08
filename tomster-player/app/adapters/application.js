import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'tomster-player/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = ENV.apiHost;
  namespace = ENV.apiNamespace;
}
