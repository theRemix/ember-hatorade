import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Controller.extend({
  notify: service(),
  danthes: service(),
  urlChecker: service(),
  subdomain: Ember.computed.alias('urlChecker.subdomain'),
  showStreamModal: false,
  appTitle: Ember.computed('subdomain', function(){
    if (this.get('subdomain').length > 0){
      return this.get('subdomain').toUpperCase() + '.HATORA.DE'
    } else {
      return 'HATORA.DE'
    }
  }),
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
      debugger
      let publication = this.get('danthes.fayeClient').publish('/commands', { command: "ping" })
      publication.then(function() {console.log('success')}, function(error) {console.log('error: ' + error.message)})
    },

    make_it_happen(){
    },
    commitStreamChange(term_array) {
      this.get('danthes.fayeClient').publish( '/commands', {
        command: "restart_and_search",
        restart_and_search: term_array
      })
      this.set('showStreamModal',false)
    },

  },

  splitHostname() {
      var result = {};
      var regexParse = new RegExp('([a-z\-0-9]{2,63})\.([a-z\.]{2,5})$');
      var urlParts = regexParse.exec(window.location.hostname);
      result.domain = urlParts[1];
      result.type = urlParts[2];
      result.subdomain = window.location.hostname.replace(result.domain + '.' + result.type, '').slice(0, -1);;
      return result.subdomain;
  }
});
