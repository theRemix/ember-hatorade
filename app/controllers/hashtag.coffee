`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

HashtagController = Ember.Controller.extend
  init: ->
  hashtag: ''
  fitered_tweets: Ember.computed 'tweet.@each.hashtags', 'target', ->
    if @get('hashtag') == ''
      @get('tweets')
    else
      @get('tweets').filterBy('hashtag', @get('target'))

`export default HashtagController`
