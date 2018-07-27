import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  links: computed('author', 'mentions', function(){
    let initial_links = []
    return initial_links
      .pushObjects(this.get('author'))
      .pushObjects(this.get('mentions'))
      .pushObjects(this.get('quoted'))
      .pushObjects(this.get('retweet'))
      .pushObjects(this.get('hashtags'))
  }),

  nodes: computed('tweets.[]', 'users.[]', 'hashtags.[]', function(){
    let tweet_objects =  this.get('tweets').map(function(tweet){
      let tweet_object =  JSON.parse(JSON.stringify(tweet));
      tweet_object.id = tweet.get('id')
      return tweet_object
    })
    let user_objects = this.get('users').map(function(user){
      let user_object = JSON.parse(JSON.stringify(user));
      user_object.id = user.get('id')
      return user_object
    })
    let hashtag_objects = this.store.peekAll('hashtag').map(function(hashtag){
      let hashtag_object = JSON.parse(JSON.stringify(hashtag));
      hashtag_object.id = hashtag.get('id')
      return hashtag_object
    })
    return tweet_objects.pushObjects(user_objects).pushObjects(hashtag_objects);
  }),

  author: computed('nodes', function(){
    let author_links = this.get('tweets')
      .filter( (tweet) => tweet.get('author.id') != null , this)
      .map(function(tweet){
        try {
        let author = this.get('nodes').find( (node) => node.id == parseInt(tweet.get('author.id')) )
        let tweet_object =  this.get('nodes').find( (node) => node.id == parseInt(tweet.get('id')) )
        let fun =  {
          source: tweet_object,
          target: author,
          color: 'blue',
          width: 5
        }
        return fun
        } catch(e) { debugger }
    }, this)
    return author_links
  }),

  mentions: computed('nodes', function(){
    let tweets = this.get('tweets')
    let mention_links = tweets.filter( (tweet) => tweet.get('mentions.length') > 0 )
    let moar_fun = []
    mention_links.forEach(function(tweet) {
      let users = tweet.get('mentions').map( function(user) {
        try {
          let user_object = this.get('nodes').find((node) => node.id == parseInt(user.id))
          let tweet_object = this.get('nodes').find( (node) => node.id == parseInt(tweet.get('id')) )
        let fun =  {
          source: tweet_object,
          target: user_object,
          color: 'green',
          width: 2
        }
        return fun
        } catch(e) { debugger }
      }, this)
      moar_fun.pushObjects(users)
    }, this)
    return moar_fun
  }),

  quoted: computed('nodes', function(){
    let tweets = this.get('tweets')
    let quoted_tweets = tweets.filter( (tweet) => tweet.get('quote.id') != null )
    return quoted_tweets.map(function(tweet) { 
      let quoted_object = this.get('nodes').find( (node) => node.id == parseInt(tweet.get('quote.id')) )
      let tweet_object = this.get('nodes').find( (node) => node.id == parseInt(tweet.get('id')) )
      return { 
        source: tweet_object,
        target: quoted_object,
        color: 'red',
        width: 3
      }
    })
  }),

  retweet: computed('nodes', function() {
    let tweets = this.get('tweets')
    let tweet_with_retweets = tweets.filter( (tweet) => tweet.get('retweet.id') != null )
    return tweet_with_retweets.map(function(tweet) {
      let retweet_object = this.get('nodes').find( (node) => node.id == parseInt(tweet.get('retweet.id')) )
      let tweet_object   = this.get('nodes').find( (node) => node.id == parseInt(tweet.get('id')) )
      return { 
        source: retweet_object,
        target: tweet_object,
        color: 'purple',
        width: 4
      }
    }, this)
  }),
  hashtags: computed('nodes', function(){
    let tweets = this.get('tweets')
    let tweets_with_hashtags = tweets.filter( (tweet) => tweet.get('hashtags.length') > 0 )
    let moar_fun = []
    tweets_with_hashtags.forEach(function(tweet) {
      let hashtags = tweet.get('hashtags').map( function(hashtag) {
        try {
          let hashtag_object = this.get('nodes').find((node) => node.id == parseInt(hashtag.get('id')) || node.text == hashtag.get('text'))
          if (hashtag_object == null) { debugger }
          let tweet_object = this.get('nodes').find( (node) => node.id == parseInt(tweet.get('id')) )
        let fun =  {
          source: tweet_object,
          target: hashtag_object,
          color: 'yellow',
          width: 1
        }
        return fun
        } catch(e) { debugger }
      }, this)
      moar_fun.pushObjects(hashtags)
    }, this)
    return moar_fun
  })
});
