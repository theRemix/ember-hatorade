import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  notify: service(),
  danthes: service(),
  showStreamModal: false,
  init(args){
    this.get('danthes').sign(
      {
        channel: 'notifications',
        callback: function(message) {
          this.get('notify').info(message)
        }.bind(this)
      }
    );
    this.get('danthes').sign(
      {
        channel: 'commands',
        callback: function(message) {
        }.bind(this)
      }
    );

    this._super(args);
  },
  actions: {
    toggleStreamModal() { debugger },
    authenticateWithTwitter() {
      this.get('session').authenticate('authenticator:torii', 'dougtwitter', this.get('subdomain'))
      .then(function() {
        this.get('session').authorize('authorizer:twitter');
        route.transitionTo('index');
      })
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
      debugger
      this.get('danthes.fayeClient').publish( '/commands', {
        command: "restart_and_search",
        restart_and_search: term_array
      })
      this.set('showStreamModal',false)
    },

  },

});
