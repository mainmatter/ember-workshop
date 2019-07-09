import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'tomster-player/config/environment';

export default class OAuthOAuth2PasswordGrantAuthenticator extends OAuth2PasswordGrant {
  serverTokenEndpoint = `${ENV.apiHost ? ENV.apiHost : ''}/token`;
}
