import Component from '@ember/component';

export default Component.extend({
  isLoggedIn: Ember.computed.alias('appSession.isAuthenticated'),
  actions: {
    toggleStreamModal() {
      this.attrs.toggleStreamModal.update(true);
    },
    authenticateWithTwitter() {
      this.attrs.authenticateWithTwitter();
    },
    ping(){ this.attrs.ping() }
  }
});
