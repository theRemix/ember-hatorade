import { Promise as EmberPromise } from 'rsvp';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  sortProperties: ['id:dsc'],
  showStreamControllButton: true,
  notify: service(),
  danthes: service(),
  init(args){
    this.get('danthes').sign(
      {
        channel: 'messages',
        callback: function(message) {
          this.get('notify').info('got a tweet')
          this.tweet_from_websocket(message)
        }.bind(this),
        user: 'voodoologic'
      }
    );
    this._super(args);
  },

  tweet_from_websocket(message){
    let profile_image = null
    let screen_name   = null
    if (message.user && message.user.profile_image_url)
       profile_image = message.user.profile_image_url)
    if (message.user && message.user.screen_name)
      screen_name = message.user.screen_name
    let tweet = {
      id: message.id,
      text: message.text,
      screen_name: screen_name,
      favorite_count: message.favorite_count,
      url: message.url,
      created_at: message.created_at,
      entities: message.entities,
      profile_image: profile_image
    }
    let model_hashtags = this.hashtags_from_websocket(message)
    let model_author   = this.user_from_websocket(message);
    let model_mentions = this.users_from_websocket(message);
    let model_quote    = this.processQuoted(message)
    let model_retweet  = this.processRetweet(message)
    let model_reply    = this.processReply(message)
    tweet.hashtags       = model_hashtags
    tweet.author         = model_author
    tweet.mentions       = model_mentions
    tweet.quote          = model_quote
    let model_tweet      = this.store.createRecord('tweet', tweet)
    this.set('model', this.store.peekAll('tweet').sortBy('id').reverse())
  },

  hashtags_from_websocket(message){
    let hashtags = []
    message.entities.hashtags.forEach( function(hashtag) {
      hashtags.push( this.firstOrCreateHashtag(hashtag) )
    }, this)
    return hashtags
  },
  user_from_websocket(message) {
    let author = {
      id: message.user.id,
      screen_name: message.user.screen_name,
      profile_image: message.user.profile_image_url
    }
    return this.firstOrCreateUser(author)
  },
  users_from_websocket(message) {
    let users = []
    message.entities.user_mentions.forEach( function(user) {
      users.push( this.firstOrCreateUser(user) )
    }, this)
    return users
  },


  firstOrCreateUser(user) {
    try {
      return this.store.peekRecord('user', user.id) || this.store.createRecord('user', user)
    } catch(e) { console.log(e); debugger}
  },
  firstOrCreateTweet(tweet) {
    try {
      return this.store.peekRecord('tweet', tweet.id) || this.tweet_from_websocket(tweet)
    } catch(e) { console.log(e); debugger}
  },
  firstOrCreateHashtag(hashtag) {
    try {
      return this.store.peekAll('hashtag').find( (h) => h.text == hashtag.text ) || this.store.createRecord("hashtag", hashtag)
    } catch(e) { console.log(e); debugger}
  },

  processReply(message) {
    if (message.in_reply_to_screen_name) {
      let replied_user  = this.firstOrCreateUser({id: message.in_reply_to_user_id, screen_name: message.in_reply_to_screen_name,})
      let replied_tweet = this.firstOrCreateTweet({ id: message.in_reply_to_status_id })
      replied_tweet.set('author', replied_user)
      return replied_tweet
    }
  },

  processQuoted(tweet_message) {
    // if (tweet_message.quoted_status) {
    //   return this.store.peekRecord('tweet', tweet_message.retweeted_status.id) || this.tweet_from_websocket(tweet_message.quoted_status)
    // }
  },

  processRetweet(tweet_message) {
    if ( tweet_message.retweeted_status ) {
      return this.store.peekRecord('tweet', tweet_message.retweeted_status.id) || this.tweet_from_websocket(tweet_message.retweeted_status)
    }
  }


});
