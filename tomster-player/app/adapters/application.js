import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import ENV from 'tomster-player/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  host = ENV.apiHost;
  namespace = ENV.apiNamespace;

  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      // OAuth 2
      headers[
        'Authorization'
      ] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }
}
