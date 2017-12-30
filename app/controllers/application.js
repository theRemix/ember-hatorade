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
          notification.info(message)
        }.bind(this)
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
    let hashtags = this.hashtags_from_websocket(message)
    hashtags.forEach( function(hashtag) {
      this.store.createRecord('hashtag', hashtag)
    }, this)
    let author = this.user_from_websocket(message);
    this.store.createRecord('user', author);
    let mentions = message.entities.user_mentions
    mentions.forEach( function(user) {
      this.store.createRecord('user', user)
    }, this)
    tweet.hashtags = hashtags
    tweet.author   = author
    tweet.mentions = mentions
    this.store.createRecord('tweet', tweet)
  },
  hashtags_from_websocket(message){
    let hashtags = []
    message.entities.hashtags.forEach( function(hashtag) {
      hashtags.push(hashtag)
    })
    return hashtags
  },
  user_from_websocket(message) {
    let author = {
      screen_name: message.user.screen_name,
      profile_image: message.user.profile_image_url
    }
    return author
  }

});
