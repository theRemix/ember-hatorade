import { Promise as EmberPromise } from 'rsvp';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  applicationController: Ember.inject.controller('application'),
  urlChecker: service(),
  sortProperties: ['id:dsc'],
  showStreamControllButton: true,
  subdomain: Ember.computed.alias('urlChecker.subdomain'),
  notify: service(),
  danthes: service(),
  init(args){
    // this.get('danthes').sign(
    //   {
    //     channel: 'messages',
    //     callback: function(message) {
    //       this.get('notify').info('got a tweet')
    //       this.tweet_from_websocket(message)
    //       this.decrimentCount()
    //     }.bind(this),
    //     screen_name: this.get('appSession.currentUser.screen_name') || 'voodoologic',
    //     admin: this.get('isAdmin')
    //   }
    // );
    this._super(args);
  },

  isAdmin: Ember.computed.equal('appSession.currentUser.screen_name', 'subdomain'),


});
