import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Controller.extend({
  notify: service(),
  danthes: service(),
  showStreamModal: false,
  nodes: [],
  init(args){
  },
  url() {
    if (false){//this.get('subdomain')) {
      return `${config.apiScheme}${this.get('subdomain')}.${config.apiHost}${config.apiPort}/users/auth/twitter`
    } else {
      return `${config.apiScheme}${config.apiHost}${config.apiPort}/users/auth/twitter`
    }
  },
  actions: {
    toggleStreamModal() { debugger },
    authenticateWithTwitter() {
      this.get('session').open('twitter').then(function(data) {
      }).catch((error) =>  {  debugger; console.log("error: ", error) })
    },

    logOut() {
      this.get('session').invalidate('authenticator:torii').then(
        () => { route.transitionTo('index')  }
      )
    },

    ping() {
      let publication = this.get('danthes.fayeClient').publish('/commands', { command: "ping" })
      publication.then(function() {console.log('success')}, function(error) {console.log('error: ' + error.message)})
    },

    commitStreamChange(term_array) {
      this.get('danthes.fayeClient').publish( '/commands', {
        command: "restart_and_search",
        restart_and_search: term_array
      })
      this.set('showStreamModal',false)
    },

  },

});
