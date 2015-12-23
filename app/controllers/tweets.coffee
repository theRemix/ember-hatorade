`import Ember from 'ember'`

TweetsController = Ember.Controller.extend
  queryParams: ['hashtag', 'user']
  hashtag: ''
  user: ''
  filteredArticles: Ember.computed 'hashtag', 'model', ->
    hashtag = @get('hashtag')
    tweets  = @get('model')
    if hashtag
      @modelFor('hashtag').get('tweets')
    else
      tweets


`export default TweetsController`
