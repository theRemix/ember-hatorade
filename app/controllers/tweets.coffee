`import Ember from 'ember'`

TweetsController = Ember.Controller.extend
  queryParams:
    hashtag:
      refreshModel: true
    user:
      refreshModel: true
  hashtag: null
  user: null
  filteredTweets: Ember.computed 'hashtag', 'model', ->
    hashtag = @get('hashtag')
    tweets  = @get('model')
    tweets.uniq()


`export default TweetsController`
