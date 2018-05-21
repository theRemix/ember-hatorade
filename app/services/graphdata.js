import Service from '@ember/service';

export default Service.extend({
  nodes: [],
  links: [],
  tweetBreak(tweet){
    console.log(tweet)
    let stored_tweet = this.nodes.findBy("id", tweet.id) 
    if (!stored_tweet) {
      tweet.r = 10
      tweet.cx = 400
      tweet.cy = 200
      if (!tweet) {debugger}
      this.nodes.pushObject(tweet)
    }
    this.processRelationships(tweet)
  },
  processRelationships(tweet) {
    console.log('process relationships for ', tweet.id)
    this.processReply(tweet)
    this.processMentions(tweet)
    this.processAuthor(tweet)
    this.processQuoted(tweet)
    this.processRetweet(tweet)
  },
  processQuoted(tweet) {
    console.log('process quoted ', tweet.id)
    if (tweet.quoted_status) {
      let quoted_tweet = this.nodes.findBy("id", tweet.quoted_status.id)
      if (!quoted_tweet){
        tweet.quoted_status.r = 10
        tweet.quoted_status.cx = 400
        tweet.quoted_status.cy = 200
        if (!tweet.quoted_status) {debugger}
        this.nodes.pushObject(tweet.quoted_status)
      } else {
        this.processRelationships(quoted_tweet)
      }
    }
  },
  processRetweet(tweet) {
    console.log('process retweet ', tweet.id)
    if ( tweet.retweeted_status ) {
      let saved_retweeted = this.nodes.findBy("id", tweet.retweeted_status.id)
      if (!saved_retweeted){
        tweet.retweeted_status.r = 10
        tweet.retweeted_status.cx = 400
        tweet.retweeted_status.cy = 200
        if (!tweet.retweeted_status) {debugger}
        this.nodes.pushObject(tweet.retweeted_status)
        let thing = { color: 'DarkTurquoise', width: 5, opacity: 1}
        console.log('retweeted status link', tweet.retweeted_status)
        this.createLink(tweet, tweet.retweeted_status, thing)
        this.processRelationships(tweet.retweeted_status)
      } else {
        let thing = { color: 'DarkTurquoise', width: 5, opacity: 1}
        console.log('saved retweeted status link', saved_retweeted)
        this.createLink(tweet, saved_retweeted, thing)
      }
    }
  },
  processAuthor(tweet) {
    console.log('process author ', tweet.id)
    let saved_user = this.nodes.findBy("id", tweet.user.id)
    if (!saved_user) {
      tweet.user.fill = 'blue'
      tweet.user.r = 5
      this.nodes.pushObject(tweet.user)
      this.createLink(tweet.user, tweet, {color: 'purple', width: 5, opacity: 1})
    } else {
      if (!tweet.user) {debugger}
      this.createLink(saved_user, tweet, {color: 'purple', width: 5, opacity: 1})
    }
  },
  processReply(tweet) {
    console.log('process reply ', tweet.id)
    if (tweet.in_reply_to_screen_name) {
      if (tweet.retweeted_status && tweet.retweeted_status.extended_tweet) { debugger }
      let saved_replied_user = this.nodes.findBy("id", tweet.in_reply_to_user_id)
      let replied_user = null
      if (!saved_replied_user){
        let replied_user = { id: tweet.in_reply_to_user_id, screen_name: tweet.in_reploy_to_screen_name, r: 5 }
      } else {
        let replied_user = saved_replied_user
      }
      let saved_replied_tweet = this.nodes.findBy("id", tweet.in_reply_to_status_id)
      let replied_tweet = null
      if (!saved_replied_tweet) {
        replied_tweet = { id: tweet.in_reploy_to_status_id, r: 5 }
      } else {
        replied_tweet = savd_replied_tweet
      }
      replied_tweet.r = 10
      replied_tweet.cx = 400
      replied_tweet.cy = 200
      if (!replied_tweet) {debugger}
      console.log("replied tweet", replied_tweet)
      this.nodes.pushObject(replied_tweet)
      this.nodes.pushObject(replied_user)
      let reply_options = {color: 'teal', width: 3, opacity: 1}
      console.log("replied user", replied_user)
      this.createLink(replied_tweet, replied_user, {color: '#BC8F8F', width: 3, opacity: 1})
      console.log("replied tweet", replied_tweet)
      this.createLink(tweet, replied_tweet, reply_options )
    }
  },
  processMentions(tweet) {
    console.log('process mentions ', tweet.id)
    let saved_user_mention = null
    tweet.entities.user_mentions.forEach((user_mention) => {
      let saved_user_mention = this.nodes.findBy("id", user_mention.id)
      if (!saved_user_mention) {
        user_mention.r = 5
        if (!user_mention) {debugger}
        this.nodes.pushObject(user_mention)
        this.createLink(user_mention, tweet, {color: 'grey', width: 4, opacity: 1})
      } else {
        this.createLink(saved_user_mention, tweet, {color: 'grey', width: 4, opacity: 1})
      }
    })
  },
  createLink(source, target, options) {
    console.log("source", source)
    console.log("target", target)
    try {
      this.links.pushObject({
        source: source,
        target: target,
        color: options.color,
        opacity: options.opacity,
        width: options.width
      })
    } catch(err) {
      console.log(err)
      debugger
    }
  }
});
