import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  session: service(),

  actions: {
    authenticate(e) {
      e.preventDefault();

      let { username, password } = this.getProperties('username', 'password');
      this.get('session').authenticate('authenticator:oauth2-password-grant', username, password).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    }
  }
});
