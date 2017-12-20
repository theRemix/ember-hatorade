import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  notify: Ember.inject.service(),
  danthes: Ember.inject.service(),
  init(args){
    const notification = this.get('notify');
    $.getJSON('/Users/dougheadley/Sandbox/itest/example_tweet.json', function(data){
      debugger
    });
    this.get('danthes').sign(
      {
        channel: 'messages',
        callback(message){
          return new Ember.RSVP.Promise( function(resolve, reject) {
            console.log(message);
            resolve(message)
          }).then(function(message) {
            console.log(message);
            notification.info(message)
          })
        }
      }
    );
    this.get('danthes').sign(
      {
        channel: 'notifications',
        callback(message) {
          return new Ember.RSVP.Promise( function(resolve, reject) {
            console.log(message);
            resolve(message)
          }).then(function(message) {
            console.log(message);
            notification.info(message)
          })
        }
      }
    );

    this._super(args);
  },
  actions: {
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
      this.get('danthes.fayeClient').publish('/messages', "PING")
    },

    commitStreamChange() {
      this.get('danthes.fayeClient').client.publish( '/commands', {
        command: "restart_and_search",
        restart_and_search: $('input.stream-input').val()
      })
    }

  }
});
