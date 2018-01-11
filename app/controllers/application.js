import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  notify: service(),
  danthes: service(),
  showStreamModal: false,
  init(args){
    this.get('danthes').sign(
      {
        channel: 'messages',
        callback: function(message) {
          this.tweet_from_websocket(message)
          this.set('model', this.store.peekAll('tweet').sortBy('id').reverse())
        }.bind(this)
      }
    );
    this.get('danthes').sign(
      {
        channel: 'notifications',
        callback: function(message) {
          console.log(message)
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
      this.get('danthes.fayeClient').publish('/messages', "PING")
    },

    commitStreamChange() {
      this.get('danthes.fayeClient').client.publish( '/commands', {
        command: "restart_and_search",
        restart_and_search: $('input.stream-input').val()
      })
    },

  },
  tweet_from_websocket(message){
    let tweet = {
      id: message.id,
      text: message.text,
      screen_name: message.user.screen_name,
      favorite_count: message.favorite_count,
      url: message.url,
      created_at: message.created_at,
      entities: message.entities,
      profile_image: message.user.profile_image_url
    }
    let model_hashtags   = this.hashtags_from_websocket(message)
    let model_author     = this.user_from_websocket(message);
    let model_mentions   = this.users_from_websocket(message);
    tweet.hashtags       = model_hashtags
    tweet.author         = model_author
    tweet.mentions       = model_mentions
    let model_tweet      = this.store.createRecord('tweet', tweet)
  },
  hashtags_from_websocket(message){
    let hashtags = []
    message.entities.hashtags.forEach( function(hashtag) {
      hashtags.push( this.store.createRecord('hashtag', hashtag) )
    }, this)
    return hashtags
  },
  user_from_websocket(message) {
    let author = {
      id: message.user.id,
      screen_name: message.user.screen_name,
      profile_image: message.user.profile_image_url
    }
    return this.store.peekRecord('user', author.id) || this.store.createRecord('user', author)
  },
  users_from_websocket(message) {
    let users = []
    message.entities.user_mentions.forEach( function(user) {
      users.push( this.store.peekRecord('user', user.id) || this.store.createRecord('user', user) )
    }, this)
    return users
  }

});
