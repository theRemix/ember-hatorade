import Component from '@ember/component';

export default Component.extend({
  actions: {
    toggleStreamModal() {
      this.attrs.toggleStreamModal.update(true);
    },
    authenticateWithTwitter() {
      this.attrs.authenticateWithTwitter();
    },
    activateStream(){
      this.attrs.activateStream();
    },
    logOut() {
      this.attrs.logOut();
    },
    ping(){ this.attrs.ping() },
    connectToMessages() { this.attrs.connectToMessages() },
    connectToNotifications() {this.attrs.connectToNotifications() },
    connectToCommands() { this.attrs.connectToCommands() }
  }
});
