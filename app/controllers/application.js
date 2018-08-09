import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Controller.extend({
  notify: service(),
  danthes: service(),
  urlChecker: service(),
  subdomain: Ember.computed.alias('urlChecker.subdomain'),
  showStreamModal: false,
  isLoggedIn(){ return this.get('appSession.isAuthenticated') },
  appTitle: Ember.computed('subdomain', function(){
    if (this.get('subdomain'))
      return this.get('subdomain').toUpperCase() + '.HATORA.DE'
    else
      return 'HATORA.DE'
  }),
  nodes: [],
  url() {
    if (false){//this.get('subdomain')) {
      return `${config.apiScheme}${this.get('subdomain')}.${config.apiHost}${config.apiPort}/users/auth/twitter`
    } else {
      return `${config.apiScheme}${config.apiHost}${config.apiPort}/users/auth/twitter`
    }
  },

  screenName: Ember.computed.alias('appSession.currentUser.screen_name'),

  searchTerms: '',
  counter: 1000,
  changeStreamTerms: Ember.computed('searchTerms', function(){
    let screen_name = this.get('screenName')
    let publishUrl  = `/messages/${screen_name}/commands`
    let publication = this.get('danthes.fayeClient').publish(publishUrl, { 
      command: "stream:activate",
      user: this.get('appSession.currentUser.screen_name'),
      searchTerms: this.get('serchTerms')
    })
    publication.then(function() {console.log('success')}, function(error) {console.log('error: ' + error.message)})
  }),

  isAdmin: Ember.computed('screenName', 'subdomain', function(){
    return this.get('screenName') == this.get('subdomain')
  }),

  decrimentCount(){
    this.set('counter', this.get('counter') - 1)
  },

  channelName: Ember.computed('screenName', 'subdomain', function(){
    let screenName = this.get('screenName'),
        subdomain  = this.get('subdomain')
    return screenName || subdomain || 'voodoologic'
  }),

  actions: {
    toggleStreamModal() { debugger },
    authenticateWithTwitter() {
      this.get('appSession').open('twitter').then(function(data) {
        return data.currentUser
      }).catch((error) =>  {  debugger; console.log("error: ", error) })
    },

    logOut() {
      this.get('appSession').close()
    },

    ping() {
      this.decrimentCount()
    },

    activateStream() {
      let channelName = this.get('channelName'),
           screenName = this.get('screenName')
      this.get('danthes').sign(
        {
          channel: 'messages',
          callback: function(message) {
            this.get('notify').info('got a tweet')
            this.tweet_from_websocket(message)
          }.bind(this),
          screen_name: channelName,
          admin: this.get('isAdmin')
        }
      );
      let publication = this.get('danthes.fayeClient').publish(`/messages/${channelName}/commands`,
        {
          meta: {
            channel: `/messages/${channelName}/commands`,
            screen_name: screenName
          },
          data: 'stream:initiate'
        }
      )
      publication.then(function(){
        console.log('message done')
      }, function(error){
        console.log('error: ', error)
      })

    },

    commitStreamChange(term_array) {
      this.get('danthes.fayeClient').publish( '/messages/hatora_de/commands', 
        {
          meta: `/messages/${this.get('screenName')}/commands`,
          command: "channel:",
          restart_and_search: term_array
        })
      this.set('showStreamModal',false)
    },
  }

});
