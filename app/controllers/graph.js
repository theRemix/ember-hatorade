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
  }),

  nodes: computed('tweets.[]', 'users.[]', function(){
    let tweet_objects =  this.get('tweets').map(function(tweet){
      let tweet_object =  JSON.parse(JSON.stringify(tweet));
      tweet_object.id = parseInt(tweet.get('id'))
      return tweet_object
    })
    let user_objects = this.get('users').map(function(user){
      let user_object = JSON.parse(JSON.stringify(user));
      user_object.id = parseInt(user.get('id'))
      return user_object
    })
    return tweet_objects.pushObjects(user_objects);
  }),

  author: computed('nodes', function(){
    let author_links = this.get('tweets')
      .filter( (tweet) => tweet.get('author.id') != null , this)
      .map(function(tweet){
        let  author = this.get('nodes').find( (node) => node.id == tweet.get('author.id') )
        let tweet_object =  this.get('nodes').find( (node) => node.id == parseInt(tweet.get('id')) )
        let fun =  {
          source: tweet_object,
          target: author,
          color: 'blue',
          width: 5
        }
        return fun
    }, this)
    return author_links
  }),

  mentions: computed('nodes', function(){
    let tweets = this.get('tweets')
    let mention_links = tweets.filter( (tweet) => tweet.get('mentions.length') > 0 )
    let moar_fun = []
    mention_links.forEach(function(tweet) {
      let users = tweet.get('mentions').map( function(user) {
        let user_object = this.get('nodes').find((node) => node.id == parseInt(user.id))
        let tweet_object = this.get('nodes').find( (node) => node.id == parseInt(tweet.get('id')) )
        let fun =  {
          source: tweet_object,
          target: user_object,
          color: 'green',
          width: 2
        }
        return fun
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
    return tweet_with_retweets .map(function(tweet) { 
      let retweet_object = this.get('nodes').find( (node) => node.id == parseInt(tweet.get('retweet.id')) )
      let tweet_object   = this.get('nodes').find( (node) => node.id == parseInt(tweet.get('id')) )
      return { 
        source: retweet_object,
        target: tweet_object,
        color: 'purple',
        width: 4
      }
    })
  })
});
